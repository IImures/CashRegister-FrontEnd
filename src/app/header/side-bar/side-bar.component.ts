import {Component, makeStateKey, OnInit, TransferState} from '@angular/core';
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
    private sidebarService: CatalogService,
    private transferState: TransferState
  ) {
    this.sidebarHeader = sidebarHeader;
  }

  ngOnInit(): void {

    const CATALOG_KEY = makeStateKey<CatalogItem[]>('catalog-data');

    if (this.transferState.hasKey(CATALOG_KEY)) {
      this.catalog = this.transferState.get(
        CATALOG_KEY,
        []
      );
      this.transferState.remove(CATALOG_KEY);
    } else {
      this.sidebarService.getCatalog().subscribe({
        next: (catalog: CatalogItem[]) => {
          this.catalog = catalog;
          this.transferState.set(CATALOG_KEY, catalog);
        },
        error: (err) => {
          console.error('Error fetching catalog:', err);
          this.catalog = [];
        }
      });
    }
  }


}
