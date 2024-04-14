import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
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
  loggedIn = computed(() => this.logServ.userToken() !== '');

  constructor(private router: Router, private logServ: loginService) {}

  ngOnInit(): void {
    // set value of token at signal when refresh the App
    this.logServ.userToken.set(localStorage.getItem('token'));
  }

  // logout function
  logout() {
    localStorage.removeItem('token');
    this.logServ.userToken.set('');
    this.router.navigate(['/login']);
  }
}
