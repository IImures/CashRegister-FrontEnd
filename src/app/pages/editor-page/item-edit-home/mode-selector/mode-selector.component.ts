import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-mode-selector',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './mode-selector.component.html',
  styleUrl: './mode-selector.component.scss'
})
export class ModeSelectorComponent {

}
