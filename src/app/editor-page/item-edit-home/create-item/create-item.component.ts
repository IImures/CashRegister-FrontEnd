import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductDetailsService} from "../../../services/product-details.service";
import {ProducerDetails} from "../../../interfaces/producer-details";
import {SubCatalogItem} from "../../../interfaces/sub-catalog-item";
import {SubCatalogService} from "../../../services/sub-catalog.service";
import {ProducerService} from "../../../services/producer.service";
import {SideBarService} from "../../../services/side-bar.service";
import {CatalogItem} from "../../../interfaces/catalog-item";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {ProductResponse} from "../../../interfaces/product-response";
import {ProductRequest} from "../../../interfaces/product-request";

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    CKEditorModule,
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss'
})
export class CreateItemComponent implements OnInit{

  isBrowser: boolean;
  editorLoaded: boolean = false;
  Editor: any;
  ckConfig: any = {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable' ],
  };

  itemForm!: FormGroup;

  image: any;
  titleImage: any;

  producers: ProducerDetails[] = [];
  catalogs: CatalogItem[] =[];
  subCatalogs: SubCatalogItem[] = [];

  filteredSubCatalogs: SubCatalogItem[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductDetailsService,
    private subCatalogService: SubCatalogService,
    private catalogService: SideBarService,
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
    this.itemForm = this.fb.group({
      productName: ['', Validators.required], //done
      selectedCatalog: ['', Validators.required], // done
      subCatalogId: ['', Validators.required], //done
      producerId: ['', Validators.required], // done
      title: ['', Validators.required], //done
      description: ['', Validators.required], //done
      characteristics: ['', Validators.required], //done
      titleImage: ['', Validators.required],
      image: [null, Validators.required],
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
    if(this.image == null || this.titleImage == null) {
      return
    }
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
    let descImgCreated = false;
    let productImgCreated = false;
    this.productService.createProduct(productRequest).subscribe({
      next: (value : ProductResponse) => {
        const productId = value.id;

        const titleImageData = new FormData();
        titleImageData.append("image", this.titleImage, this.titleImage.name);
        this.productService.addImageToProductDescription(productId, titleImageData)
          .subscribe({
            next: () =>{
              descImgCreated = true;
            },
            error : err => {
              console.log('error creating titleImage');
              console.log(err);
            }
          });

        const imageData = new FormData();
        imageData.append("image", this.image, this.image.name);
        this.productService.addImageToProduct(productId, imageData)
          .subscribe({
            next: () => {
              productImgCreated = true;
            },
            error : err => {
              console.log('error creating image');
              console.log(err);
            }
          });
        if(!descImgCreated){
          alert("Титульна картинка не була створена");
        }
        if(!productImgCreated){
          alert("Картинка продукту не була створена");
        }
        alert("Продукт створенно успішно")
      },

      error: err => {
        console.log(err.error.message);
      }
    })
  }

  onDismiss() {
    this.itemForm.reset();
  }

  onCatalogChange() {

    const selectedCatalogId : string = this.itemForm.get('selectedCatalog')?.value;
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

}
