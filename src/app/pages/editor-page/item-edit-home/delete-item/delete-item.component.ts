import {Component, OnInit} from '@angular/core';
import {ListItemDetails} from "../../../../interfaces/list-item-details";
import {ProductService} from "../../../../services/product.service";
import {CatalogItem} from "../../../../interfaces/catalog-item";
import {CatalogService} from "../../../../services/catalog.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PageResponse} from "../../../../interfaces/page-response";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-delete-item',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.scss'
})
export class DeleteItemComponent implements OnInit {

  products: ListItemDetails[] = [];
  catalogs: CatalogItem[] = [];

  currentPage : number = 1;
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

  deleteItem(id: number) {
    const confirmed = window.confirm('Точно видалити продукт?');
    if (confirmed) {
      this.productService.deleteItem(id).subscribe(
        {
          next: () =>{
            alert("Операція вдалась");
            this.fetchData(this.selectedSubCatalog, 1);
          },
          error: err => {
            alert("Сталась помилка " + err.error.message);
          }
        }
      );
    }
  }
}
