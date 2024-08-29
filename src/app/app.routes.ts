import { Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {FindUsComponent} from "./find-us/find-us.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {RoleGuardService} from "./services/role-guard.service";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    title:"Main page"
  },
  {
    path: 'about-us',
    component: FindUsComponent,
    title:"About us"
  },
  {
    path: 'catalog/:categoryId/list/:subCategoryId',
    component: CatalogComponent,
    pathMatch: 'full',
    title:"Catalog page"
  },
  {
    path: 'product/:id',
    component:ProductPageComponent,
    title:"Product page"
  },
  {
      path: 'edit',
      canActivate: [RoleGuardService],
      loadComponent: ()=> import('./editor-page/editor-page.component').then(m=> m.EditorPageComponent),
      title:"Editor page",
      children: [
        {
          path:'',
          loadComponent: ()=>import('./editor-page/edit-home/edit-home.component').then(m=> m.EditHomeComponent),
        },
        {
          path: 'catalog',
          loadComponent: () => import('./editor-page/catalog-edit/catalog-edit.component').then(m=> m.CatalogEditComponent),
        },
        {
          path: 'producer',
          loadComponent: () => import('./editor-page/producer-edit/producer-edit.component').then(m=> m.ProducerEditComponent),
        },
        {
          path: 'item',
          loadComponent: ()=> import('./editor-page/item-edit-home/item-edit-home.component').then(m=> m.ItemEditHomeComponent),
          children:[
            {
              path: '',
              loadComponent: ()=> import('./editor-page/item-edit-home/mode-selector/mode-selector.component').then(m=> m.ModeSelectorComponent),
            },
            {
              path: 'update',
              loadComponent: ()=> import('./editor-page/item-edit-home/update-item/update-item.component').then(m=> m.UpdateItemComponent),
              children:[
                {
                  path: "",
                  loadComponent: () => import('./editor-page/item-edit-home/update-item/select-page/select-page.component').then(m=> m.SelectPageComponent),
                },
                {
                  path:":id",
                  loadComponent: () => import('./editor-page/item-edit-home/update-item/update-page/update-page.component').then(m=> m.UpdatePageComponent),
                }
              ]
            },
            {
              path: 'delete',
              loadComponent: () => import('./editor-page/item-edit-home/delete-item/delete-item.component').then(m=>m.DeleteItemComponent),
            },
            {
              path: 'create',
              loadComponent: () => import('./editor-page/item-edit-home/create-item/create-item.component').then(m=> m.CreateItemComponent),
            }

          ]
        }
      ]
    },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m=> m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },

];
