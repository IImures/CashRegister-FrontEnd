
import {HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {inject} from "@angular/core";
import {LocalStorageService} from "../services/local-storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

export function setAuthHeader(req: HttpRequest<unknown>, next: HttpHandlerFn) : Observable<HttpEvent<unknown>> {
  if(req.method === "GET") {
    return next(req);
  }
  const authToken = inject(LocalStorageService).getToken();
  if(!authToken) {
    return next(req);
  }

  if(req.headers.get("Authorization")) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}` )
  });
  return next(newReq);
}

export function retryInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response && event.status === 403) {
        const refreshToken = localStorageService.getToken();
        if (!refreshToken) {
          router.navigate(['/login']);
        }
      }
    }),
    catchError(error => {
      if (error.status === 403) {
        const refreshToken = localStorageService.getRefreshToken();

        if (!refreshToken) {
          router.navigate(['/login']);
          return throwError(() => error); // return the error
        }

        return authService.refresh(refreshToken).pipe(
          switchMap(authResponse => {
            if (!authResponse) {
              return throwError(() => error);
            }

            localStorageService.setTokens(authResponse);

            const newReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${authResponse.token}`)
            });

            return next(newReq);
          }),
          catchError(() => {
            router.navigate(['/login']);
            return throwError(() => error);
          })
        );
      } else {
        return throwError(() => error);
      }
    })
  );
}
