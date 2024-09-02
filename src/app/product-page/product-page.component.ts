import { Component, OnDestroy, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ProductPageDetails} from "../interfaces/product-page-details";
import {ProductService} from "../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit, OnDestroy {

  public description: ProductPageDetails = {
    id: "",
    productName: "",
    title: "",
    description: "",
    characteristics:"",
    imageData: "",
    imageUrl: ""
  };
  public componentLoaded = false;
  private routeSubscription?: Subscription;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
  }



  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if ( !productId ) {
        console.log("Failed to get data from URL");
        return;
      }

      if ( isNaN(Number(productId)) ) {
        console.log("Failed to get data from URL not a Number");
        return;
      }

      this.fetchData(productId);
      this.componentLoaded = true;
    });

  }

  private fetchData(productId: string) {
    this.productService.getProductDescription(productId).subscribe(
      description => {
        this.description = description;

        this.productService.getProductDescriptionImage(productId).subscribe(
          async image => {
            this.description.imageData = await image.text();
            this.description.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.description.imageData);
          }
        );

      }

    );

  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
