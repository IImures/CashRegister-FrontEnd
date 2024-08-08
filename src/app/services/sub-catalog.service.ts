import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CatalogItem} from "../interfaces/catalog-item";

@Injectable({
  providedIn: 'root'
})
export class SubCatalogService {

  private url: string = 'http://localhost:8080/api/v1/sub-catalog';

  constructor(
    private http: HttpClient,
  ) { }

  getSubCatalogById(id: number) {
    return this.http.get<CatalogItem>(`${this.url}/${id}`);
  }
}
