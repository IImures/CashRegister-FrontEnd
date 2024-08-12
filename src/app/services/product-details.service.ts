import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageResponse} from "../interfaces/page-response";
import {ListItemDetails} from "../interfaces/list-item-details";
import {Observable} from "rxjs";
import {ProductPageDetails} from "../interfaces/product-page-details";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  private url: string = 'http://localhost:8080/api/v1/product';

  constructor(
    private http: HttpClient
  ) { }

  getProductDetails(id: number, limit: number) {
    return this.http.get<PageResponse<ListItemDetails>>(`${this.url}/sub-catalog/${id}?limit=${limit}`);
  }

  getProductImage(id: number) : Observable<Blob>  {
    return this.http.get(`${this.url}/${id}/image`, { responseType: 'blob' });
  }

  getProductDescription(productId: number) {
    return this.http.get<ProductPageDetails>(`${this.url}/${productId}/description`);
  }

  getProductDescriptionImage(productId: number) : Observable<Blob>  {
    return this.http.get(`${this.url}/${productId}/description/image`, { responseType: 'blob' });
  }
}
