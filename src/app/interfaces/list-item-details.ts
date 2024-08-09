import {SafeUrl} from "@angular/platform-browser";

export interface ListItemDetails {
  id: number;
  name: string;
  imageData: string;
  imageUrl: SafeUrl;
}
