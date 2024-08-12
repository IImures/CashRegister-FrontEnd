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
}
