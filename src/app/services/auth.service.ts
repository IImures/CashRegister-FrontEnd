import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthResponse} from "../interfaces/authResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = `${environment.apiUrl}/${environment.apiVersion}/user`;

  constructor(
    private http: HttpClient,
  ) { }

  login(login: string, password: string) {
    return this.http.post<AuthResponse>(`${this.url}/login`, {
      login : login,
      password: password
    });
  }

  verify(token: string) {
    let httpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}/valid`, {}, { headers: httpHeaders });
  }
}
