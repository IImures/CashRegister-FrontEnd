import { Component } from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {SidebarHeaderService} from "../sidebar-header.service";
import {RouterLink, RouterLinkActive} from '@angular/router';
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

  categoryList: CatalogItem[] = [
    {
      mainCategoryName: "Фіскальне обладнання",
      id: "11",
      subCategories: [
        {
          subCategoryName: "Касові апарати",
          subCategoryType: "list",
          subCategoryId: "12"
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
      id: "2",
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

export interface CatalogItem{
  mainCategoryName: string;
  id: string;
  subCategories: SubCategoryItem[];
}

export interface SubCategoryItem {
  subCategoryName: string;
  subCategoryType: string;
  subCategoryId: string;
}
