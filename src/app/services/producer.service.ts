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

  getProducers() {
    return this.http.get<ProducerDetails[]>(`${this.url}`);
  }

  deleteProducer(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateProducer(id: string, producerName: string, producerEdrpou: string) {
    let body;
    if(producerEdrpou != '') {
      body = {
        "producerName" : producerName,
        "edrpou" : producerEdrpou,
      };
    }else {
      body ={
        "producerName" : producerName
      };
    }
    return this.http.put(`${this.url}/${id}`, body);
  }

  createProducer(producerName : string, producerEdrpou : string) {
    return this.http.post(`${this.url}`, {
      "producerName" : producerName,
      "edrpou" : producerEdrpou,
    });
  }
}
