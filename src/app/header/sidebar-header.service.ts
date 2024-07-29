import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarHeaderService {
  private isSidebarExpanded = false;

  constructor() { }

  getIsSidebarExpanded() : boolean {
    return this.isSidebarExpanded;
  }

  setIsSidebarExpanded(isSidebarExpanded : boolean) {
    this.isSidebarExpanded = isSidebarExpanded;
  }

  openSidebar() : boolean{
    this.isSidebarExpanded = !this.isSidebarExpanded;
    return this.isSidebarExpanded;
  }

  clickOutside() : boolean {
    if (this.isSidebarExpanded) {
      return this.openSidebar();
    }
    return false;
  }

}
