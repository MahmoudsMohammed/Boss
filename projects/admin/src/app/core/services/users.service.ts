import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { user } from '../model/user.interface';

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
      .subscribe(
        (res) => {
          this.users.set(res.users);
        },
        (err) => {
          console.log(err, 'form users request');
        }
      );
  }
}
