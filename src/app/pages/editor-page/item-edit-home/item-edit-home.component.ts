import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-item-edit-home',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './item-edit-home.component.html',
  styleUrl: './item-edit-home.component.scss'
})
export class ItemEditHomeComponent {

}
