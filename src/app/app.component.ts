import { Component } from '@angular/core';
import {NgbInputDatepicker, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from "./header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NgbInputDatepicker,
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  standalone: true
})
export class AppComponent {

  constructor() {
  }

}
