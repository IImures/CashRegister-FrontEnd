import { Routes } from '@angular/router';
import {FindUsComponent} from "./pages/find-us/find-us.component";
import {CatalogComponent} from "./pages/catalog/catalog.component";
import {ProductPageComponent} from "./pages/product-page/product-page.component";
import {RoleGuardService} from "./services/role-guard.service";
import {HomePageComponent} from "./pages/home-page/home-page.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    title:"Центр сервісного обслуговування РРО ФОП Калинченко І.М."
  },
  {
    path: 'about-us',
    component: FindUsComponent,
    title:"Про нас"
  },
  {
    path: 'catalog/:categoryId/list/:subCategoryId',
    component: CatalogComponent,
    pathMatch: 'full',
    title:"Каталог"
  },
  {
    path: 'product/:id',
    component:ProductPageComponent,
    title:"Продукт"
  },
  {
      path: 'edit',
      canActivate: [RoleGuardService],
      loadComponent: ()=> import('./pages/editor-page/editor-page.component').then(m=> m.EditorPageComponent),
      title:"Сторінка редагування",
      children: [
        {
          path:'',
          loadComponent: ()=>import('./pages/editor-page/edit-home/edit-home.component').then(m=> m.EditHomeComponent),
        },
        {
          path: 'catalog',
          loadComponent: () => import('./pages/editor-page/catalog-edit/catalog-edit.component').then(m=> m.CatalogEditComponent),
        },
        {
          path: 'producer',
          loadComponent: () => import('./pages/editor-page/producer-edit/producer-edit.component').then(m=> m.ProducerEditComponent),
        },
        {
          path: 'item',
          loadComponent: ()=> import('./pages/editor-page/item-edit-home/item-edit-home.component').then(m=> m.ItemEditHomeComponent),
          children:[
            {
              path: '',
              loadComponent: ()=> import('./pages/editor-page/item-edit-home/mode-selector/mode-selector.component').then(m=> m.ModeSelectorComponent),
            },
            {
              path: 'update',
              loadComponent: ()=> import('./pages/editor-page/item-edit-home/update-item/update-item.component').then(m=> m.UpdateItemComponent),
              children:[
                {
                  path: "",
                  loadComponent: () => import('./pages/editor-page/item-edit-home/update-item/select-page/select-page.component').then(m=> m.SelectPageComponent),
                },
                {
                  path:":id",
                  loadComponent: () => import('./pages/editor-page/item-edit-home/update-item/update-page/update-page.component').then(m=> m.UpdatePageComponent),
                }
              ]
            },
            {
              path: 'delete',
              loadComponent: () => import('./pages/editor-page/item-edit-home/delete-item/delete-item.component').then(m=>m.DeleteItemComponent),
            },
            {
              path: 'create',
              loadComponent: () => import('./pages/editor-page/item-edit-home/create-item/create-item.component').then(m=> m.CreateItemComponent),
            }

          ]
        }
      ]
    },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m=> m.LoginComponent),
    title:'Логін'
  },
  {
    path: '**',
    redirectTo: 'home',
  },

];
