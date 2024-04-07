import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from '../../../features/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class headerComponent implements OnInit {
  loggedIn = signal<boolean>(false);

  constructor(private router: Router, private logServ: loginService) {
    effect(() => {
      if (this.logServ.userToken() !== '') {
        this.loggedIn.set(true);
      }
    });
  }

  ngOnInit(): void {}

  // logout function
  logout() {
    localStorage.removeItem('token');
    this.logServ.userToken.set('');
    this.router.navigate(['/login']);
    this.loggedIn.set(false);
  }
}
