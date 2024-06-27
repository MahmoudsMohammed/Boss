import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'admin';
  translateService = inject(TranslateService);
  renderer2 = inject(Renderer2);
  ngOnInit(): void {
    // when the app load translate use the LS language
    // change the body direction based on the LS language
    if ('lang' in localStorage) {
      localStorage.getItem('lang') === 'en'
        ? this.renderer2.setAttribute(document.body, 'dir', 'ltr')
        : this.renderer2.setAttribute(document.body, 'dir', 'rtl');
      this.translateService.use(localStorage.getItem('lang'));
    } else {
      this.translateService.use('en');
    }
  }
}
