import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class headerComponent {
  constructor(private router: Router) {}

  // logout function
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
