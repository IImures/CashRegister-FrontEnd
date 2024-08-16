import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {ListComponentComponent} from "./list-component/list-component.component";
import {NgForOf, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import { Subscription } from "rxjs";
import {CatalogItem} from "../interfaces/catalog-item";
import {SubCatalogService} from "../services/sub-catalog.service";
import {ListItemDetails} from "../interfaces/list-item-details";
import {ProductDetailsService} from "../services/product-details.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ProducerService} from "../services/producer.service";
import {ProducerDetails} from "../interfaces/producer-details";
import {FormsModule} from "@angular/forms";
import {PageResponse} from "../interfaces/page-response";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    ListComponentComponent,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    SlicePipe,
    NgIf,
    FormsModule
  ],
  host: {ngSkipHydration: 'true'},
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit, OnDestroy {

  catalog?: CatalogItem;

  listItems : ListItemDetails[] = [];
  producers : ProducerDetails[] = [];


  protected searchArg: string = '';
  protected limit: number = 18;
  protected currentPage: number = 0;
  protected totalPages: number = 0;

  private routeSubscription?: Subscription;
  @ViewChildren(ListComponentComponent) listComponents!: QueryList<ListComponentComponent>;


  constructor(
   private sanitizer: DomSanitizer,
   private route: ActivatedRoute,
   private subCatalogService: SubCatalogService,
   private productService: ProductDetailsService,
   private producerService: ProducerService,
 ){}

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      const subCatalogId = params.get('subCategoryId');
      console.log(`categoryId ${categoryId} subCatalogId ${subCatalogId}`);
      if (!categoryId || !subCatalogId) {
        console.log("Failed to get data from URL");
        return;
      }

      if (isNaN(Number(categoryId)) || isNaN(Number(subCatalogId))) {
        console.log("Failed to get data from URL");
        return;
      }

       this.fetchData(subCatalogId);
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    this.listComponents.destroy()
    this.listItems =[];
  }

  private fetchData(subCatalogId: string) {
    this.getCatalogData(subCatalogId);
    this.getProductData(subCatalogId, 1);
    this.getProducersData(subCatalogId);
  }

  private getProducersData(subCatalogId: string) {
    this.producerService.getProducersInSubCategory(subCatalogId)
      .subscribe({
        next: data => {
          this.producers = data;
          this.producers.forEach(el => el.selected = false);
          console.log(this.producers);
        }
      })
  }

  private getCatalogData(subCatalogId: string) {
    this.subCatalogService.getSubCatalogById(subCatalogId)
      .subscribe(
        catalogItem => {
          this.catalog = catalogItem;
        },
      );
  }

  private getProductData(subCatalogId: string, page: number) {
    this.productService.getProductDetails(subCatalogId, this.limit, page)
      .subscribe(
        productDetails => {

          this.getPages(productDetails);

          this.getProductImages();
        }
      );
  }

  private getPages(productDetails: PageResponse<ListItemDetails>) {
    this.listItems = productDetails.content;
    this.currentPage = productDetails.pageable.pageNumber + 1;
    this.totalPages = productDetails.totalPages;
  }

  private getProductImages() {
    this.listItems.forEach(
      component => {
        this.productService.getProductImage(component.id).subscribe(
          {
            next: async (data) => {
              component.imageData = await data.text();
              component.imageUrl = this.sanitizer.bypassSecurityTrustUrl(component.imageData);
            },
            error: err => {
              console.log(err);
            }
          }
        )
      }
    );
  }

  onProducerSelectionChange(producer: any) {
    if(this.searchArg.length > 0){
      this.onSearch();
      return;
    }
    const selectedProducers = this.producers
      .filter(p => p.selected)
      .map(p => p.id);

    this.productService.getProductsWithSelectedProducers(this.catalog?.subCatalogs[0].id!, selectedProducers)
      .subscribe({
        next: (productDetails) => {

          this.getPages(productDetails);

          this.getProductImages();
        }
      });
  }

  onSearch(){
    const selectedProducers = this.producers
      .filter(p => p.selected)
      .map(p => p.id);

    this.productService.getProductsWithNameAndProducers(this.catalog?.subCatalogs[0].id!, this.searchArg ,selectedProducers)
      .subscribe({
        next: (productDetails) => {
          this.getPages(productDetails);

          this.getProductImages();
        }
      })
  }

  goToPage(page: number) {
    this.getProductData(this.catalog?.subCatalogs[0].id!, page);
  }
}

