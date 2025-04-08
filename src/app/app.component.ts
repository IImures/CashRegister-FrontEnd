import {Component, makeStateKey, TransferState} from '@angular/core';
import {NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from "./header/header.component";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {FooterComponent} from "./pages/footer/footer.component";
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

  private static APP_STATE_KEY = makeStateKey<{ showHeader: boolean; showFooter: boolean }>('app-state');

  constructor(
    private router: Router,
    private transferState: TransferState
  ) {
    if (this.transferState.hasKey(AppComponent.APP_STATE_KEY)) {
      const storedState = this.transferState.get(AppComponent.APP_STATE_KEY, {
        showHeader: true,
        showFooter: true
      });
      this.showHeader = storedState.showHeader;
      this.showFooter = storedState.showFooter;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderFooterVisibility(event.urlAfterRedirects);

        this.transferState.set(AppComponent.APP_STATE_KEY, {
          showHeader: this.showHeader,
          showFooter: this.showFooter
        });
      }
    });
  }

  updateHeaderFooterVisibility(url: string) {
    const hiddenRoutesForHeader = environment.hideHeaderOn;
    this.showHeader = !hiddenRoutesForHeader.some(route => url.includes(route));

    const hiddenRoutesForFooter = environment.hideFooterOn;
    this.showFooter = !hiddenRoutesForFooter.some(route => url.includes(route));
  }

}
