import { Component } from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {SidebarHeaderService} from "../sidebar-header.service";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  sidebarHeader: SidebarHeaderService

  constructor(sidebarHeader: SidebarHeaderService) {
    this.sidebarHeader = sidebarHeader;
  }

}
