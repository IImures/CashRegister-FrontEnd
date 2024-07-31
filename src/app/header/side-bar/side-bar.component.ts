import { Component } from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {SidebarHeaderService} from "../sidebar-header.service";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    NgForOf
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
          subCategoryUrl: "1"
        },
        {
          subCategoryName: "Фіскальні реєстратори",
          subCategoryUrl: "2"
        }
      ]
    },
    {
      mainCategoryName: "Лазерні принтери",
      nameId: "terminals1",
      subCategories: [
        {
          subCategoryName: "Ремонт лазерних принтерів",
          subCategoryUrl: "3"
        },
        {
          subCategoryName: "Заправка картриджів",
          subCategoryUrl: "4"
        }
      ]
    }
  ];

  sidebarHeader: SidebarHeaderService

  constructor(sidebarHeader: SidebarHeaderService) {
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
  subCategoryUrl: string;
}
