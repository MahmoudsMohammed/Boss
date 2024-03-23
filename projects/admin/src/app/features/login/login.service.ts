import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginRequest, loginResponse } from './login.models';

@Injectable({ providedIn: 'root' })
export class loginService {
  constructor(private http: HttpClient) {}

  login(data: loginRequest): Observable<loginResponse> {
    return this.http.post<loginResponse>(
      'https://manage-mkex.onrender.com/auth/login',
      data
    );
  }
}
