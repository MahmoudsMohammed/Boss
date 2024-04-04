import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
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
      .pipe(finalize(() => this.requestFinish.set(true)))
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          this.userToken.set(res.token);
        },
        (err) => {
          this.requestError.set(err.message);
        }
      );
  }
}
