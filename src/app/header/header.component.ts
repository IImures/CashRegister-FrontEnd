import { Component } from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSidebarExpanded = false;

  openSidebar(){
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  clickOutside() {
    if (this.isSidebarExpanded) {
      this.openSidebar();
    }
  }
}
