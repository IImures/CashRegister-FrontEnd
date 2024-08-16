import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProducerDetails} from "../interfaces/producer-details";

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  private url: string = `${environment.apiUrl}/${environment.apiVersion}/producer`;

  constructor(
    private http: HttpClient
  ) { }

  getProducersInSubCategory(subCategoryId: string) {
    return this.http.get<ProducerDetails[]>(`${this.url}/subcatalog/${subCategoryId}`);
  }
}
