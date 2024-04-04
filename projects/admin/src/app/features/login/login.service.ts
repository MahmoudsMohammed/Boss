import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { loginRequest, loginResponse } from './login.models';

@Injectable({ providedIn: 'root' })
export class loginService {
  userToken = signal<string>('');
  requestError = signal<string>('');
  requestFinish = signal<boolean>(false);
  constructor(private http: HttpClient) {}

  login(data: loginRequest): void {
    this.http
      .post<loginResponse>('https://manage-mkex.onrender.com/auth/login', data)
      .pipe(
        tap(() => {
          this.requestFinish.set(false);
          this.requestError.set('');
        }),
        finalize(() => this.requestFinish.set(true))
      )
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          this.userToken.set(res.token);
        },
        (err) => {
          console.log(err);
          this.requestError.set(err.error.message);
        }
      );
  }
}
