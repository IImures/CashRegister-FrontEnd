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
    NgIf
  ],
  host: {ngSkipHydration: 'true'},
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit, OnDestroy {

  catalog?: CatalogItem;

  listItems : ListItemDetails[] = []
  protected limit: number = 20;
  protected pageNumber: number = 0;
  protected maxPage: number = 0;

  private routeSubscription?: Subscription;
  @ViewChildren(ListComponentComponent) listComponents!: QueryList<ListComponentComponent>;


  constructor(
   private sanitizer: DomSanitizer,
   private route: ActivatedRoute,
   private subCatalogService: SubCatalogService,
   private productService: ProductDetailsService
 ){}

  ngOnInit() {
    console.log("On init catalog component");

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

       this.fetchData(Number(subCatalogId));
    });
  }

  ngOnDestroy() {
    console.log("Component ngOnDestroy");
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    this.listComponents.destroy()
    this.listItems =[];
  }

  private fetchData(subCatalogId: number) {
    this.subCatalogService.getSubCatalogById(subCatalogId)
      .subscribe(
        catalogItem =>{
          this.catalog = catalogItem;
        },
      );
    this.productService.getProductDetails(subCatalogId, this.limit)
      .subscribe(
        productDetails =>{

          console.log('Raw productDetails:', productDetails);
          console.log('Raw productDetails content:', productDetails.content);
          console.log('Content length:', productDetails.content.length);

          this.listItems = productDetails.content;
          this.pageNumber = productDetails.pageable.pageNumber;
          this.maxPage = productDetails.totalPages;

          this.getProductImages();
        }
      );
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
}

