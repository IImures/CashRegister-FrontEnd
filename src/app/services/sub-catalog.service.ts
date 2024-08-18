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

  getSubCatalogById(id: string) {
    return this.http.get<CatalogItem>(`${this.url}/${id}`);
  }

  createSubCatalog(catalogId: string, subCatalogName : string, subCatalogType : string) {
    return this.http.post(this.url, {
      "subCatalogName" : subCatalogName,
      "subCatalogType" : subCatalogType,
      "catalogId": catalogId,
    });
  }

  deleteCatalog(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateSubCatalog(id: string, subCatalogName: string, subCatalogType : string) {
    console.log(subCatalogName);
      return this.http.put(`${this.url}/${id}`, {
      "subCatalogName" : subCatalogName,
      "subCatalogType" : subCatalogType,
    });
  }
}
