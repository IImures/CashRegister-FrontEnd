import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MediaLinksComponent} from "./media-links/media-links.component";
import {GeneralInfoComponent} from "./general-info/general-info.component";
import {NavigationListComponent} from "./navigation-list/navigation-list.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MediaLinksComponent,
    GeneralInfoComponent,
    NavigationListComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  currentYear: number = new Date().getFullYear();

}
