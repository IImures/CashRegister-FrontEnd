import {SafeUrl} from "@angular/platform-browser";
import {ProducerDetails} from "./producer-details";
import {SubCatalogItem} from "./sub-catalog-item";

export interface ProductPageDetails {
  id: string;
  productName: string;
  title: string;
  description: string;
  characteristics: string;
  producer?: ProducerDetails;
  subCatalog?: SubCatalogItem;
  imageData: string;
  imageUrl: SafeUrl;
}
