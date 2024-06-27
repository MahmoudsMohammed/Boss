import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class headerComponent implements OnInit {
  language: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if ('lang' in localStorage) {
      localStorage.getItem('lang') === 'en'
        ? (this.language = 'عربي')
        : (this.language = 'English');
    } else {
      this.language = 'عربي';
    }
  }

  // logout function
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // change language
  onChangeLanguage() {
    if (this.language === 'عربي') {
      localStorage.setItem('lang', 'ar');
    } else {
      localStorage.setItem('lang', 'en');
    }
    window.location.reload();
  }
}
