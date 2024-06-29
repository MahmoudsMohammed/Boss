import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { loginRequest } from '../models/authentication';

@Injectable()
export class AuthenticationService {
  http = inject(HttpClient);
  userLogin(data: loginRequest) {
    return this.http.post(`${environment.baseAPI}auth/login`, data);
  }
}
