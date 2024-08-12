import {SafeUrl} from "@angular/platform-browser";

export interface ProductPageDetails {
  id: string;
  productName: string;
  title: string;
  description: string;
  characteristics: string;
  imageData: string;
  imageUrl: SafeUrl;
}
