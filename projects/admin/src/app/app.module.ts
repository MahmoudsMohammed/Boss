import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpInterceptor,
} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { loginComponent } from './features/login/login.component';
import { sharedModule } from './shared/shared.module';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';
import { tokenInterceptor } from './core/Interceptors/token.interceptor';
import { errorInterceptor } from './core/Interceptors/error.interceptor';
import { spinnerInterceptor } from './core/Interceptors/spinner.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, loginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(),
    sharedModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: spinnerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: tokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: errorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
