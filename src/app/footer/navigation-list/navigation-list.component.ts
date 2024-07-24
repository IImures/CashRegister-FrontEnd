import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navigation-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigation-list.component.html',
  styleUrl: './navigation-list.component.scss'
})
export class NavigationListComponent {

  navigationList: NavigationItem[] =[
    {
      title: ">> Як нас знайти?",
      url: "/find-us"
    },
    {
      title: ">> Часті питання",
      url: "#"
    },
    {
      title: ">> Приклад",
      url: "#"
    },
    {
      title: ">> Приклад",
      url: "#"
    },
  ];

}

interface NavigationItem{
  title: string;
  url: string;
}
