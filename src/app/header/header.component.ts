import { Component } from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {Router} from "express";
import {SidebarHeaderService} from "./sidebar-header.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    RouterLink,
    RouterLinkActive,
    SideBarComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  sidebarHeader : SidebarHeaderService

  constructor(sidebarHeader : SidebarHeaderService) {
    this.sidebarHeader = sidebarHeader;
  }

}
