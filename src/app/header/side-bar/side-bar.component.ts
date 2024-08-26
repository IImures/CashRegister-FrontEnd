import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {SidebarHeaderService} from "../sidebar-header.service";
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CatalogService} from "../../services/catalog.service";
import {CatalogItem} from "../../interfaces/catalog-item";
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
export class SideBarComponent implements OnInit {

  catalog: CatalogItem[] = [];

  constructor(
    public sidebarHeader: SidebarHeaderService,
    private sidebarService: CatalogService
  ) {
    this.sidebarHeader = sidebarHeader;
  }

  ngOnInit(): void {
    this.sidebarService.getCatalog().subscribe(
      catalog => this.catalog = catalog,
    );
  }


}
