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
      title: ">> Про нас",
      url: "/about-us"
    },
  ];

}

interface NavigationItem{
  title: string;
  url: string;
}
