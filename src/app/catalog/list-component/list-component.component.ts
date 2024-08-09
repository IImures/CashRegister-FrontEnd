import {Component, Input,} from '@angular/core';
import { NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ListItemDetails} from "../../interfaces/list-item-details";


@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  host: {ngSkipHydration: "true"},
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.scss'
})
export class ListComponentComponent{
  @Input() itemDetails: ListItemDetails | null= null;

  constructor(
  ) {}

}
