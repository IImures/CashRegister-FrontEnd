import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {ProducerDetails} from "../../../../../interfaces/producer-details";
import {CatalogItem} from "../../../../../interfaces/catalog-item";
import {SubCatalogItem} from "../../../../../interfaces/sub-catalog-item";
import {ProductService} from "../../../../../services/product.service";
import {SubCatalogService} from "../../../../../services/sub-catalog.service";
import {CatalogService} from "../../../../../services/catalog.service";
import {ProducerService} from "../../../../../services/producer.service";
import {ProductRequest} from "../../../../../interfaces/product-request";
import {ProductResponse} from "../../../../../interfaces/product-response";
import {Subscription} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductPageDetails} from "../../../../../interfaces/product-page-details";

@Component({
  selector: 'app-update-page',
  standalone: true,
  imports: [
    CKEditorModule,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './update-page.component.html',
  styleUrl: './update-page.component.scss'
})
export class UpdatePageComponent implements OnInit, OnDestroy {

  isBrowser: boolean;
  editorLoaded: boolean = false;
  Editor: any;
  ckConfig: any = {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable' ],
  };

  itemForm!: FormGroup;

  productDetails!: ProductPageDetails;
  image: any;
  titleImage: any;

  producers: ProducerDetails[] = [];
  catalogs: CatalogItem[] =[];
  subCatalogs: SubCatalogItem[] = [];

  filteredSubCatalogs: SubCatalogItem[] = [];

  private routeSubscription?: Subscription;
  protected pageLoaded: boolean = false;
  private productCatalog!: CatalogItem;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private subCatalogService: SubCatalogService,
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private producerService: ProducerService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      import('@ckeditor/ckeditor5-build-classic').then(ClassicEditor => {
        this.Editor = ClassicEditor.default;
        this.editorLoaded = true;
      });
    }
  }

  ngOnInit(): void {

    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if ( !productId ) {
        console.log("Failed to get data from URL");
        return;
      }

      if ( isNaN(Number(productId)) ) {
        console.log("Failed to get data from URL not a Number");
        return;
      }

      this.getProduct(productId);
    });

  }

  private getProduct(productId: string) {
    this.productService.getProductDescription(productId).subscribe(
      {
        next: (data: ProductPageDetails) => {
          this.productDetails = data;
          this.subCatalogService.getSubCatalogById(data.subCatalog!.id).subscribe(
            {
              next: (data: CatalogItem) => {
                this.productCatalog = data;
                this.onCatalogChange(data.id);
                this.createForm();
                this.pageLoaded = true;
              }
            }
          );
        }
      }
    )
  }

  private createForm() {
    this.itemForm = this.fb.group({
      productName: [this.productDetails.productName, Validators.required], //done
      selectedCatalog: [this.productCatalog.id, Validators.required], // done
      subCatalogId: [this.productDetails.subCatalog?.id, Validators.required], //done
      producerId: [this.productDetails.producer?.id, Validators.required], // done
      title: [this.productDetails.title, Validators.required], //done
      description: [this.productDetails.description, Validators.required], //done
      characteristics: [this.productDetails.characteristics, Validators.required], //done
      titleImage: [null, ],
      image: [null, ],
    });
    this.fetchData();
  }

  private fetchData() {
    this.producerService.getProducers().subscribe(
      {
        next: (data: ProducerDetails[]) => {
          this.producers = data;
        }
      }
    );

    this.catalogService.getCatalog().subscribe(
      {
        next: (data: CatalogItem[]) => {
          this.catalogs = data;
        }
      }
    );
  }

  onSubmit() {
    console.log(this.itemForm.value);

    const data = this.itemForm.value;
    const table = this.extractTable();
    const productRequest : ProductRequest = {
      "productName" : data.productName,
      "subCatalogId" : data.subCatalogId,
      "producerId" : data.producerId,
      "title" : data.title,
      "description" : data.description,
      "characteristics" : table,
    }

    this.productService.updateProduct(productRequest, this.productDetails.id).subscribe({
      next: (value : ProductResponse) => {
        const productId = value.id;

        if(data.titleImage !== null ) {
          const titleImageData = new FormData();
          titleImageData.append("image", this.titleImage, this.titleImage.name);
          this.productService.addImageToProductDescription(productId, titleImageData)
            .subscribe({
              error: err => {
                alert("Титульна картинка не була створена");
                console.log(err);
              }
            });
        }
        if(data.image !== null ) {
          const imageData = new FormData();
          imageData.append("image", this.image, this.image.name);
          this.productService.addImageToProduct(productId, imageData)
            .subscribe({
              error: err => {
                alert("Картинка продукту не була створена");
                console.log(err);
              }
            });
        }
        alert("Продукт оновленно успішно")
      },

      error: err => {
        console.log(err.error.message);
      }
    })
  }

  onCatalogChange(selectedCatalogId : string) {

    const selectedCatalog = this.catalogs.find(catalog => catalog.id == selectedCatalogId);

    if (selectedCatalog) {
      this.filteredSubCatalogs = selectedCatalog.subCatalogs;
      // Reset the subCatalog selection
      this.itemForm.get('selectedSubCatalog')?.setValue('');
      this.itemForm.get('selectedSubCatalog')?.enable();
    }
  }

  onImageSelected($event: any) {
    console.log($event);
    if($event.target != null) {
      if($event.target.files[0].type == 'image/jpeg' || $event.target.files[0].type == 'image/png') {
        this.image = $event.target.files[0];
        console.log(this.image);
      }
    }
  }

  onTitleImageSelected($event: any) {
    console.log($event);
    if($event.target != null) {
      if($event.target.files[0].type == 'image/jpeg' || $event.target.files[0].type == 'image/png'){
        this.titleImage = $event.target.files[0];
        console.log(this.image);
      }
    }
  }

  private extractTable(): string {
    const data = this.itemForm.value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.characteristics, 'text/html');

    const figureElement = doc.querySelector('figure.table');

    if (figureElement) {
      const tableElement = figureElement.querySelector('table');

      if (tableElement) {
        tableElement.classList.add('table');
      }

      const thElements = figureElement.querySelectorAll('th');
      thElements.forEach(th => {
        th.setAttribute('scope', 'row');
      });

      const tableHtml = figureElement.innerHTML;

      console.log(tableHtml);
      return tableHtml;
    } else {
      return data.characteristics;
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }


}
