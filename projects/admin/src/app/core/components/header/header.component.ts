import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class headerComponent implements OnInit {
  loggedIn!: boolean;
  user!: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  // logout function
  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
