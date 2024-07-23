import { Component } from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
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
