import { Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {FindUsComponent} from "./find-us/find-us.component";
import {CatalogComponent} from "./catalog/catalog.component";

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
];
