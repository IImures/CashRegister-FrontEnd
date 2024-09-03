import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ListItemDetails} from "../../../../../interfaces/list-item-details";
import {CatalogItem} from "../../../../../interfaces/catalog-item";
import {ProductService} from "../../../../../services/product.service";
import {CatalogService} from "../../../../../services/catalog.service";
import {DomSanitizer} from "@angular/platform-browser";
import {PageResponse} from "../../../../../interfaces/page-response";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.scss'
})
export class SelectPageComponent implements OnInit{

  products: ListItemDetails[] = [];
  catalogs: CatalogItem[] = [];

  currentPage : number = 0;
  totalPages : number = 0;
  limit: number = 20;

  selectedSubCatalog!: string;

  constructor(
    private productService: ProductService,
    private catalogService: CatalogService,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.catalogService.getCatalog().subscribe(
      {
        next: (catalog: CatalogItem[]) => {
          this.catalogs = catalog;
        }
      }
    );


  }

  onSubCatalogChange($event: Event, subCatalogId: string) {
    const checkbox = $event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    this.clearOtherSubCatalogs(subCatalogId);
    if (isChecked) {
      this.selectedSubCatalog = subCatalogId;
      this.fetchData(subCatalogId, 1);

    }else{
      this.products = [];
      this.currentPage = 1;

    }
  }

  fetchData(subCatalogId: string, page: number) {
    this.productService.getProductDetails(subCatalogId, this.limit, page).subscribe(
      {
        next: data => {
          this.getPages(data);
          this.getProductImages();
        }
      }
    )
  }

  private getProductImages() {
    this.products.forEach(
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

  private getPages(productDetails: PageResponse<ListItemDetails>) {
    this.products = productDetails.content;
    this.currentPage = productDetails.pageable.pageNumber + 1;
    this.totalPages = productDetails.totalPages;
  }

  clearOtherSubCatalogs(selectedSubCatalogId: string) {
    this.catalogs.forEach(catalogItem => {
      catalogItem.subCatalogs.forEach(subCatalogItem => {
        if(subCatalogItem.id !== selectedSubCatalogId) {
          const checkbox = document.getElementById('sc-' + subCatalogItem.id) as HTMLInputElement;
          if (checkbox) {
            checkbox.checked = false;
          }
        }
      });
    });
  }

  goToPage(page: number) {
    this.fetchData(this.selectedSubCatalog, page);
  }
}
