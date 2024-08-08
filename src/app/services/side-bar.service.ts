import { Injectable } from '@angular/core';
import {CatalogItem} from "../interfaces/catalog-item";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private url: string = 'http://localhost:8080/api/v1/catalog';

  constructor(
    private http: HttpClient
  ) {}

  getCatalog(){
    return this.http.get<CatalogItem[]>(this.url)
  }
}
