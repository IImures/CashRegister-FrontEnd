import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NavigationListComponent} from "../footer/navigation-list/navigation-list.component";
import {GeneralInfoComponent} from "../footer/general-info/general-info.component";
import {MediaLinksComponent} from "../footer/media-links/media-links.component";

@Component({
  selector: 'app-find-us',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavigationListComponent,
    GeneralInfoComponent,
    MediaLinksComponent
  ],
  templateUrl: './find-us.component.html',
  styleUrl: './find-us.component.scss'
})
export class FindUsComponent {

}
