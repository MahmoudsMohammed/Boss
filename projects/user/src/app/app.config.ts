import { HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { spinnerInterceptor } from './core/Interceptors/spinner.interceptor';
import { errorInterceptor } from './core/Interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'square-jelly-box' })),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: spinnerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: errorInterceptor,
      multi: true,
    },
  ],
};
