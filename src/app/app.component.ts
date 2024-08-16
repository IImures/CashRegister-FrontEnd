import { Component } from '@angular/core';
import {NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from "./header/header.component";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {NgIf} from "@angular/common";
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {ngSkipHydration: "true"},
  imports: [
    NgbInputDatepicker,
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    NgIf
  ],
  standalone: true
})
export class AppComponent {

  showHeader = true;
  showFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log('Navigation end', event);
        this.updateHeaderFooterVisibility(event.urlAfterRedirects);
      }
    });
  }

  updateHeaderFooterVisibility(url: string) {
    // Adjust these routes based on where you don't want to show header/footer
    const hiddenRoutesForHeader = environment.hideHeaderOn
    this.showHeader = !hiddenRoutesForHeader.some(route => url.includes(route));

    const hiddenRoutesForFooter = environment.hideFooterOn
    this.showFooter = !hiddenRoutesForFooter.some(route => url.includes(route));
  }

}
