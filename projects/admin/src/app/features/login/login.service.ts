import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { loginRequest, loginResponse } from './login.models';

@Injectable({ providedIn: 'root' })
export class loginService {
  userToken = signal<string>('');
  requestError = signal<string>('');
  constructor(private http: HttpClient) {}

  login = (data: loginRequest): void => {
    this.requestError.set('');
    this.http
      .post<loginResponse>('https://manage-mkex.onrender.com/auth/login', data)
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          this.userToken.set(res.token);
        },
        (err) => {
          this.requestError.set(err.error.message);
        }
      );
  };
}
