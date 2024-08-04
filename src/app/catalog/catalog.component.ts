import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ListComponentComponent} from "./list-component/list-component.component";
import {NgForOf, NgOptimizedImage, SlicePipe} from "@angular/common";
import {CatalogItem} from "../header/side-bar/side-bar.component";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    ListComponentComponent,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    SlicePipe
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit, OnDestroy {
  category: CatalogItem = {
    mainCategoryName: "Фіскальне обладнання",
    id: "1",
    subCategories: [
      {
        subCategoryName: "Касові апарати",
        subCategoryType: "list",
        subCategoryId: "1"
      }
    ]
  }
  listItems : ListItemDetails[] = [
    {
      id: "1",
      name: "Модель MG-V5T.02",
    },
    {
      id: "2",
      name: "Модель MG-V5T.02",
    },
    {
      id: "3",
      name: "Модель MG-V5T.02",
    },
    {
      id: "4",
      name: "Модель MG-V5T.02",
    },
    {
      id: "5",
      name: "Модель MG-V5T.02",
    },
    {
      id: "6",
      name: "Модель MG-V5T.02",
    },
  ]
  protected limit: number = 20;

  private routeSubscription?: Subscription;

 constructor(
   private router: Router,
   private route: ActivatedRoute
 ){}

  ngOnInit() {
    this.routeSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        const categoryId = this.route.snapshot.paramMap.get('categoryId');
        const subCategoryId = this.route.snapshot.paramMap.get('subCategoryId');
        console.log(categoryId + " " + subCategoryId);
      });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}

export interface ListItemDetails{
  id: string;
  name: string;
}
