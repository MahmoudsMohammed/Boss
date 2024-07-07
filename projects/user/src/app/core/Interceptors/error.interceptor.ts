import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class errorInterceptor implements HttpInterceptor {
  toaster = inject(ToastrService);
  router = inject(Router);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        const message: string = err.error.message;
        // display toaster with error message
        this.toaster.error(message);
        if (message.includes('jwt')) {
          // navigate to login if the error from jwt
          this.router.navigate['auth/login'];
        }
        return throwError(err);
      })
    );
  }
}
