import {Component, OnInit} from '@angular/core';
import {CatalogItem} from "../../interfaces/catalog-item";
import {SideBarService} from "../../services/side-bar.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubCatalogItem} from "../../interfaces/sub-catalog-item";
import {SubCatalogService} from "../../services/sub-catalog.service";

@Component({
  selector: 'app-catalog-edit',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './catalog-edit.component.html',
  styleUrl: './catalog-edit.component.scss'
})
export class CatalogEditComponent implements OnInit {

  catalogItems : CatalogItem[] = [];
  subCatalogTypes : SubCatalogType[] = [
    {
      id: "1",
      type: "list"
    },
    {
      id: "2",
      type: "page"
    }
  ];
  catalogForm: FormGroup;
  ifEditCatalog : {[key: string] : boolean} = {};
  editCatalogForm : {[key: string] : FormGroup} = {};

  subCatalogForms: { [key: string]: FormGroup } = {};
  ifEditSubCatalog: {[key: string]: boolean} = {};
  editSubCatalogForm: {[key: string]: FormGroup} = {};

  constructor(
    private catalogService: SideBarService,
    private subCatalogService: SubCatalogService,
    private fb: FormBuilder
  ) {

    this.catalogForm = this.fb.group({
      catalogName: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.catalogService.getCatalog().subscribe(
      {
        next: (catalog: CatalogItem[]) => {
          this.catalogItems = catalog;
          this.createForms();
        }
      }
    );
  }

  onSubmitCatalog() {
    const data = this.catalogForm.value;
    this.catalogService.createCatalog(data.catalogName).subscribe(
      {
        next: () => {
          alert("Операція вдалась");
          this.catalogForm.reset()
          this.fetchData();
        },
        error : err => {
          alert("Виникла проблема, " + err.error.message);
        }
      }
    );
  }

  onDismissCatalog(){
    this.catalogForm.reset();
  }

  editCatalog(catalogItem: CatalogItem) {
    this.editCatalogForm[catalogItem.id] = this.fb.group({
      catalogName: [catalogItem.catalogName, Validators.required],
    });
    this.ifEditCatalog[catalogItem.id] = true;
  }

  deleteCatalog(id: string) {
    const confirmed = window.confirm('Точно видалити категорію?');
    if (confirmed) {
      this.catalogService.deleteCatalog(id).subscribe({
        next: () => {
          alert("Операція вдалась");
          this.fetchData();
        },
        error : err => {
          alert("Виникла проблема, " + err.error.message);
        }
      });
    }
  }

  onSubmitEditCatalog(catalogItem: CatalogItem) {
    const form = this.editCatalogForm[catalogItem.id];
    const data = form.value;
    this.catalogService.updateCatalog(catalogItem.id, data.catalogName).subscribe({
      next: () => {
        alert("Операція вдалась");
        this.fetchData();
      },
      error : err => {
        alert("Виникла проблема, " + err.error.message);
      }
    });
    this.onDismissEditCatalog(catalogItem);
  }

  onDismissEditCatalog(catalogItem: CatalogItem) {
    this.ifEditCatalog[catalogItem.id] = false;
    delete this.editCatalogForm[catalogItem.id];
  }

  private createForms() {

    this.catalogItems.forEach(catalogItem => {
      this.subCatalogForms[catalogItem.id] = this.fb.group({
        subCatalogName: ['', Validators.required],
        subCatalogType: ['', Validators.required]
      });
    });

    this.catalogItems.forEach(catalogItem => {
      catalogItem.subCatalogs.forEach(subCatalogItem => {
        this.ifEditSubCatalog[subCatalogItem.id] = false;
      });
    });

    this.catalogItems.forEach(catalogItem => {
      this.ifEditCatalog[catalogItem.id] = false;
    })
  }

  editSubCatalog(subCatalogItem: SubCatalogItem) {
    this.ifEditSubCatalog[subCatalogItem.id] = true;
    this.editSubCatalogForm[subCatalogItem.id] = this.fb.group({
      subCatalogName: [subCatalogItem.subCatalogName, Validators.required],
      subCatalogType: [subCatalogItem.subCatalogType, Validators.required]
    })
  }

  deleteSubCatalog(id: string) {
    const confirmed = window.confirm('Точно видалити підкатегорію?');
    if (confirmed) {
      this.subCatalogService.deleteCatalog(id).subscribe({
        next: () => {
          alert("Операція вдалась");
          this.fetchData();
        },
        error : err => {
          alert("Виникла проблема, " + err.error.message);
        }
      });
    }
  }

  onSubmitSubCategory(subCatalogId: string) {
    const form = this.subCatalogForms[subCatalogId];
    const data = form.value;
    this.subCatalogService.createSubCatalog(subCatalogId, data.subCatalogName, data.subCatalogType).subscribe(
      {
        next: () => {
          alert("Операція вдалась");
          this.fetchData();
        },
        error : err => {
          alert("Виникла проблема, " + err.error.message);
        }
      }
    );
  }

  onDismissSubCatalog(subCatalogId: string) {
    const form = this.subCatalogForms[subCatalogId];
    if (form) {
      form.reset();
    }
  }

  onDismissEditSubCatalog(subCatalogItem: SubCatalogItem) {
    this.ifEditSubCatalog[subCatalogItem.id] = false;
    delete this.editSubCatalogForm[subCatalogItem.id];
  }

  onModifySubCatalog(subCatalogItem: SubCatalogItem) {
    const form = this.editSubCatalogForm[subCatalogItem.id];
    const data = form.value;
    const typeId = this.subCatalogTypes.find(c => c.type === data.subCatalogType)?.id;
    if(typeId !== undefined){
      this.subCatalogService.updateSubCatalog(subCatalogItem.id, data.subCatalogName, typeId).subscribe(
        {
          next: () => {
            alert("Операція вдалась");
            this.fetchData();
          },
          error : err => {
            alert("Виникла проблема, " + err.error.message);
          }
        }
      );
    }
    this.onDismissEditSubCatalog(subCatalogItem);
  }

}

interface SubCatalogType{
  id: string,
  type: string,
}
