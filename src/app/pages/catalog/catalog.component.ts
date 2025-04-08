import {Component, makeStateKey, OnDestroy, OnInit, QueryList, TransferState, ViewChildren} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {ListComponentComponent} from "./list-component/list-component.component";
import {NgForOf, NgIf, NgOptimizedImage, SlicePipe} from "@angular/common";
import { Subscription } from "rxjs";
import {CatalogItem} from "../../interfaces/catalog-item";
import {SubCatalogService} from "../../services/sub-catalog.service";
import {ListItemDetails} from "../../interfaces/list-item-details";
import {ProductService} from "../../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ProducerService} from "../../services/producer.service";
import {ProducerDetails} from "../../interfaces/producer-details";
import {FormsModule} from "@angular/forms";
import {PageResponse} from "../../interfaces/page-response";

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
  listItems: ListItemDetails[] = [];
  producers: ProducerDetails[] = [];

  protected searchArg: string = '';
  protected limit: number = 18;
  protected currentPage: number = 0;
  protected totalPages: number = 0;

  private routeSubscription?: Subscription;

  @ViewChildren(ListComponentComponent) listComponents!: QueryList<ListComponentComponent>;

  // 1. Make State Keys for each data set you want to cache
  private static SUBCATALOG_KEY = (subCatalogId: string) => makeStateKey<CatalogItem>('sub-catalog-' + subCatalogId);
  private static PRODUCT_KEY = (subCatalogId: string, page: number) => makeStateKey<PageResponse<ListItemDetails>>(`product-${subCatalogId}-${page}`);
  private static PRODUCERS_KEY = (subCatalogId: string) => makeStateKey<ProducerDetails[]>(`producers-${subCatalogId}`);

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private subCatalogService: SubCatalogService,
    private productService: ProductService,
    private producerService: ProducerService,
    private transferState: TransferState
  ) {}

  ngOnInit() {
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

      this.fetchData(subCatalogId);
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    this.listComponents.destroy();
    this.listItems = [];
  }

  private fetchData(subCatalogId: string) {
    this.getCatalogData(subCatalogId);
    this.getProductData(subCatalogId, 1);
    this.getProducersData(subCatalogId);
  }


  private getCatalogData(subCatalogId: string) {
    const key = CatalogComponent.SUBCATALOG_KEY(subCatalogId);
    if (this.transferState.hasKey(key)) {
      this.catalog = this.transferState.get<CatalogItem>(key, {
        id:'-1',
        catalogName:'',
        subCatalogs: []
      });
    } else {
      this.subCatalogService.getSubCatalogById(subCatalogId).subscribe({
        next: (catalogItem) => {
          this.catalog = catalogItem;
          this.transferState.set(key, catalogItem);
        }
      });
    }
  }

  private getProductData(subCatalogId: string, page: number) {
    const key = CatalogComponent.PRODUCT_KEY(subCatalogId, page);
    if (this.transferState.hasKey(key)) {
      const productDetails = this.transferState.get<PageResponse<ListItemDetails>>(key, {} as PageResponse<ListItemDetails>);
      if (productDetails) {
        this.getPages(productDetails);
      }
    } else {
      this.productService.getProductDetails(subCatalogId, this.limit, page).subscribe({
        next: (productDetails) => {
          this.transferState.set(key, productDetails);
          this.getPages(productDetails);
        }
      });
    }
  }


  private getProducersData(subCatalogId: string) {
    const key = CatalogComponent.PRODUCERS_KEY(subCatalogId);
    if (this.transferState.hasKey(key)) {
      this.producers = this.transferState.get<ProducerDetails[]>(key, []);
      this.producers.forEach(el => el.selected = false);
    } else {
      this.producerService.getProducersInSubCategory(subCatalogId).subscribe({
        next: (data) => {
          this.producers = data;
          this.producers.forEach(el => el.selected = false);
          this.transferState.set(key, data);
        }
      });
    }
  }

  private getPages(productDetails: PageResponse<ListItemDetails>) {
    this.listItems = productDetails.content;
    this.currentPage = productDetails.pageable.pageNumber + 1;
    this.totalPages = productDetails.totalPages;
  }

  onProducerSelectionChange(producer: ProducerDetails) {
    if (this.searchArg.length > 0) {
      this.onSearch();
      return;
    }

    const selectedProducers = this.producers
      .filter(p => p.selected)
      .map(p => p.id);

    this.productService.getProductsWithSelectedProducers(
      this.catalog?.subCatalogs[0].id!,
      selectedProducers
    ).subscribe({
      next: (productDetails) => {
        this.getPages(productDetails);
      }
    });
  }

  onSearch() {
    const selectedProducers = this.producers
      .filter(p => p.selected)
      .map(p => p.id);

    this.productService.getProductsWithNameAndProducers(
      this.catalog?.subCatalogs[0].id!,
      this.searchArg,
      selectedProducers
    ).subscribe({
      next: (productDetails) => {
        this.getPages(productDetails);
      }
    });
  }

  goToPage(page: number) {
    this.getProductData(this.catalog?.subCatalogs[0].id!, page);
  }
}

