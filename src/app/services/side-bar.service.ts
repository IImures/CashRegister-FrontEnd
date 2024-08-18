import { Injectable } from '@angular/core';
import {CatalogItem} from "../interfaces/catalog-item";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private url: string = `${environment.apiUrl}/${environment.apiVersion}/catalog`;

  constructor(
    private http: HttpClient
  ) {}

  getCatalog(){
    return this.http.get<CatalogItem[]>(this.url)
  }


  createCatalog(catalogName : string,) {
    return this.http.post(this.url, {
        catalogName : catalogName,
    })
  }

  deleteCatalog(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateCatalog(id: string, catalogName: string) {
    return this.http.put(`${this.url}/${id}`, {
      catalogName : catalogName,
    });
  }
}
