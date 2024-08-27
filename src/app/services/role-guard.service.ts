import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {LocalStorageService} from "./local-storage.service";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.localStorage.getToken();
    if(!token) return false;

    return this.authService.verify(token).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
