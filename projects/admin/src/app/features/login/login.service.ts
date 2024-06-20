import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginRequest, loginResponse } from './login.models';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class loginService {
  constructor(private http: HttpClient) {}

  login = (data: loginRequest): Observable<loginResponse> => {
    return this.http.post<loginResponse>(
      `${environment.baseAPI}auth/login`,
      data
    );
  };
}
