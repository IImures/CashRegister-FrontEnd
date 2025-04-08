import {Component, makeStateKey, OnDestroy, OnInit, TransferState} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ProductPageDetails} from "../../interfaces/product-page-details";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";

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
    characteristics:""
  };
  private routeSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private transferState: TransferState
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
    });

  }

  private fetchData(productId: string) {
    const PRODUCT_DETAILS_KEY = makeStateKey<ProductPageDetails>('product-details-' + productId);

    if (this.transferState.hasKey(PRODUCT_DETAILS_KEY)) {
      this.description = this.transferState.get(PRODUCT_DETAILS_KEY, this.description);
    } else {
      this.productService.getProductDescription(productId).subscribe(
        description => {
          this.description = description;
          this.transferState.set(PRODUCT_DETAILS_KEY, description);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  protected readonly environment = environment;
}
