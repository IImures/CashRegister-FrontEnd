import {ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ListItemDetails} from "../../interfaces/list-item-details";
import {ProductDetailsService} from "../../services/product-details.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.scss'
})
export class ListComponentComponent {
  @Input() itemDetails?: ListItemDetails;
  protected imageUrl?: SafeUrl;
  private image?: Blob;

  public isImageLoading = true;

  constructor(
    private productService: ProductDetailsService,
    private sanitizer: DomSanitizer,
  ) {
  }

  getImageFromService() {
    if(this.itemDetails == null){
      return;
    }
    this.productService.getProductImage(this.itemDetails.id).subscribe({
      next: async (data) => {
        if (data.size > 220) {
          this.image = data;
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(await this.image.text());
          this.isImageLoading = false;
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
