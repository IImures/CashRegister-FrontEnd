import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ListComponentComponent} from "./list-component/list-component.component";
import {NgForOf, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {filter, Subscription} from "rxjs";
import {CatalogItem} from "../interfaces/catalog-item";
import {SubCatalogService} from "../services/sub-catalog.service";
import {ListItemDetails} from "../interfaces/list-item-details";
import {ProductDetailsService} from "../services/product-details.service";
import {blob} from "node:stream/consumers";

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
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit,AfterViewInit , OnDestroy {

  catalog?: CatalogItem;

  listItems : ListItemDetails[] = []
  protected limit: number = 20;
  protected pageNumber: number = 0;
  protected maxPage: number = 0;

  private routeSubscription?: Subscription;
  @ViewChildren(ListComponentComponent) listComponents!: QueryList<ListComponentComponent>;


  constructor(
   private router: Router,
   private route: ActivatedRoute,
   private subCatalogService: SubCatalogService,
   private productService: ProductDetailsService
 ){}

  ngOnInit() {
    // Subscribe to paramMap to handle route parameter changes without navigation
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      const subCatalogId = params.get('subCategoryId');

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
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    this.listItems=[];
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
          this.listItems = productDetails.content;
          this.pageNumber = productDetails.pageable.pageNumber;
          this.maxPage = productDetails.totalPages;

        }
      )
  }

  ngAfterViewInit(): void {
    this.listComponents.forEach(
      component =>{
        component.getImageFromService();
      }
    );
  }



}

