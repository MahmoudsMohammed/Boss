import { NgModule } from '@angular/core';
import { headerComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [headerComponent],
  imports: [MatIconModule, RouterLink, RouterLinkActive, TranslateModule],
  exports: [headerComponent],
})
export class coreModule {}
