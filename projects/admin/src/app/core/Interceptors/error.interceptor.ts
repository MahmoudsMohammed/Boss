import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

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
        if (err.error.message.includes('jwt')) {
          this.router.navigate(['/login']);
        }
        this.toaster.error(err.error.message);
        return throwError(err);
      })
    );
  }
}
