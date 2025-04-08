import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import { retryInterceptor, setAuthHeader} from "./interceptors/SetAuthHeader";
import {GlobalErrorHandler} from "./interceptors/ErrorHandler";
import {IMAGE_CONFIG} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    {provide : ErrorHandler, useClass: GlobalErrorHandler},
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
       withInterceptors([setAuthHeader, retryInterceptor])
    ),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 100
      }
    },
  ],
};
