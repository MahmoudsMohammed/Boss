import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { user } from '../model/user.interface';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class usersService {
  http: HttpClient;
  users = signal<user[]>([]);
  constructor() {
    this.http = inject(HttpClient);
  }
  // function get All users and assign to users signal
  getUsers() {
    this.http
      .get<{ users: user[]; totalItems: number }>(
        'https://manage-mkex.onrender.com/auth/users'
      )
      .pipe(
        map((e) => {
          return e.users.filter((e) => e.role !== 'admin');
        })
      )
      .subscribe((res) => {
        this.users.set(res);
      });
  }
}
