import { Component } from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {SidebarHeaderService} from "../sidebar-header.service";
import { RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  categoryList: CatalogList[] = [
    {
      mainCategoryName: "Фіскальне обладнання",
      nameId: "printers1",
      subCategories: [
        {
          subCategoryName: "Касові апарати",
          subCategoryType: "list",
          subCategoryId: "1"
        },
        {
          subCategoryName: "Фіскальні реєстратори",
          subCategoryType: "list",
          subCategoryId: "2"
        }
      ]
    },
    {
      mainCategoryName: "Лазерні принтери",
      nameId: "terminals1",
      subCategories: [
        {
          subCategoryName: "Ремонт лазерних принтерів",
          subCategoryType: "list",
          subCategoryId: "3"
        },
        {
          subCategoryName: "Заправка картриджів",
          subCategoryType: "list",
          subCategoryId: "4"
        }
      ]
    }
  ];


  constructor(
    public sidebarHeader: SidebarHeaderService
  ) {
    this.sidebarHeader = sidebarHeader;
  }

}

export interface CatalogList{
  mainCategoryName: string;
  nameId: string;
  subCategories: SubCategory[];
}

export interface SubCategory{
  subCategoryName: string;
  subCategoryType: string;
  subCategoryId: string;
}
