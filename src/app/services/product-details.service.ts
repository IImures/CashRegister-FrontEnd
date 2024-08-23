import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageResponse} from "../interfaces/page-response";
import {ListItemDetails} from "../interfaces/list-item-details";
import {Observable} from "rxjs";
import {ProductPageDetails} from "../interfaces/product-page-details";
import {environment} from "../../environments/environment";
import {ProductResponse} from "../interfaces/product-response";
import {ProductRequest} from "../interfaces/product-request";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  private url: string = `${environment.apiUrl}/${environment.apiVersion}/product`;

  constructor(
    private http: HttpClient
  ) { }

  getProductDetails(id: string, limit: number, page: number): Observable<PageResponse<ListItemDetails>> {
    return this.http.get<PageResponse<ListItemDetails>>(`${this.url}/subcatalog/${id}?limit=${limit}&page=${page -1}`);
  }

  getProductImage(id: number) : Observable<Blob>  {
    return this.http.get(`${this.url}/${id}/image`, { responseType: 'blob' });
  }

  getProductDescription(productId: string) {
    return this.http.get<ProductPageDetails>(`${this.url}/${productId}/description`);
  }

  getProductDescriptionImage(productId: string) : Observable<Blob>  {
    return this.http.get(`${this.url}/${productId}/description/image`, { responseType: 'blob' });
  }

  getProductsWithSelectedProducers(subCatalogId: string, selectedProducers: string[])
  {
    const producersString = selectedProducers.join();
    return this.http.get<PageResponse<ListItemDetails>>(`${this.url}/subcatalog/${subCatalogId}?producers=${producersString}`);
  }

  getProductsWithNameAndProducers(subCatalogId: string, searchArg: string, selectedProducers: string[]) {
    let producers = '';
    if(selectedProducers && selectedProducers.length > 0){
      producers ='&producers=' + selectedProducers.join(', ');
    }
    return this.http.get<PageResponse<ListItemDetails>>(`${this.url}/subcatalog/${subCatalogId}?name=${searchArg}${producers}`)
  }

  createProduct(productRequest : ProductRequest) {
    return this.http.post<ProductResponse>(`${this.url}`, productRequest);
  }

  createDescription(productId: string, title: string, description: string, characteristics: string) {
    return this.http.post(`${this.url}/${productId}/description`, {
      "title": title,
      "description": description,
      "characteristics": characteristics
    });
  }

  addImageToProduct(productId: string, image: FormData) {
    return this.http.put(`${this.url}/${productId}/image`, image)
  }

  addImageToProductDescription(productId: string, titleImage: FormData) {
    return this.http.put(`${this.url}/${productId}/description/image`, titleImage)
  }

  deleteItem(productId: number) {
    return this.http.delete(`${this.url}/${productId}`);
  }
}
