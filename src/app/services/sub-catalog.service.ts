import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CatalogItem} from "../interfaces/catalog-item";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubCatalogService {

  private url: string = `${environment.apiUrl}/${environment.apiVersion}/sub-catalog`;

  constructor(
    private http: HttpClient,
  ) { }

  getSubCatalogById(id: number) {
    return this.http.get<CatalogItem>(`${this.url}/${id}`);
  }
}
