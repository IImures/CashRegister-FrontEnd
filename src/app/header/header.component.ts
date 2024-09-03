import { Component } from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {SidebarHeaderService} from "./sidebar-header.service";
import {PhonePipe} from "../pipes/phone.pipe";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    RouterLink,
    RouterLinkActive,
    SideBarComponent,
    PhonePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  contactInfo = {
    email: "igor.kalinchenko@gmail.com",
    phone: "0956789993"
  }

  constructor(public sidebarHeader : SidebarHeaderService) {}

}
