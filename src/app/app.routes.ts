import { Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {FindUsComponent} from "./find-us/find-us.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {EditorPageComponent} from "./editor-page/editor-page.component";
import {CatalogEditComponent} from "./editor-page/catalog-edit/catalog-edit.component";
import {ProducerEditComponent} from "./editor-page/producer-edit/producer-edit.component";
import {EditHomeComponent} from "./editor-page/edit-home/edit-home.component";
import {ItemEditHomeComponent} from "./editor-page/item-edit-home/item-edit-home.component";
import {ModeSelectorComponent} from "./editor-page/item-edit-home/mode-selector/mode-selector.component";
import {UpdateItemComponent} from "./editor-page/item-edit-home/update-item/update-item.component";
import {DeleteItemComponent} from "./editor-page/item-edit-home/delete-item/delete-item.component";
import {CreateItemComponent} from "./editor-page/item-edit-home/create-item/create-item.component";
import {SelectPageComponent} from "./editor-page/item-edit-home/update-item/select-page/select-page.component";
import {UpdatePageComponent} from "./editor-page/item-edit-home/update-item/update-page/update-page.component";

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
        component: ItemEditHomeComponent,
        children:[
          {
            path: '',
            component: ModeSelectorComponent,
          },
          {
            path: 'update',
            component: UpdateItemComponent,
            children:[
              {
                path: "",
                component: SelectPageComponent
              },
              {
                path:":id",
                component: UpdatePageComponent
              }
            ]
          },
          {
            path: 'delete',
            component: DeleteItemComponent,
          },
          {
            path: 'create',
            component: CreateItemComponent,
          }

        ]
      }
    ]
  },

];
