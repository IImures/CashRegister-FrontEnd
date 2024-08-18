import { Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {FindUsComponent} from "./find-us/find-us.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {EditorPageComponent} from "./editor-page/editor-page.component";
import {CatalogEditComponent} from "./editor-page/catalog-edit/catalog-edit.component";
import {ProducerEditComponent} from "./editor-page/producer-edit/producer-edit.component";
import {ItemEditComponent} from "./editor-page/item-edit/item-edit.component";
import {EditHomeComponent} from "./editor-page/edit-home/edit-home.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'find-us',
    component: FindUsComponent
  },
  {
    path: 'catalog/:categoryId/list/:subCategoryId',
    component: CatalogComponent,
    pathMatch: 'full'
  },
  {
    path: 'product/:id',
    component:ProductPageComponent
  },
  {
    path: 'edit',
    component: EditorPageComponent,
    children: [
      {
        path:'',
        component: EditHomeComponent
      },
      {
        path: 'catalog',
        component: CatalogEditComponent
      },
      {
        path: 'producer',
        component: ProducerEditComponent
      },
      {
        path: 'item',
        component: ItemEditComponent
      }
    ]
  },

];
