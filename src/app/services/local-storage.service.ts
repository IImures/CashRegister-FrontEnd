import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {AuthResponse} from "../interfaces/authResponse";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  setTokens(tokens: AuthResponse): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.setItem('token', tokens.token);
    this.setItem('refreshToken', tokens.refreshToken);
  }

  getToken() {
    return this.getItem('token');
  }

  getRefreshToken() {
    return this.getItem('refreshToken');
  }

  deleteTokens() {
    this.removeItem('token');
    this.removeItem('refreshToken');
  }
}
