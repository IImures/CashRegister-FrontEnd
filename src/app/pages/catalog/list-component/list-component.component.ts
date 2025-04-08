import {Component, Input,} from '@angular/core';
import { NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ListItemDetails} from "../../../interfaces/list-item-details";
import {environment} from "../../../../environments/environment";


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

  protected readonly environment = environment;
}
