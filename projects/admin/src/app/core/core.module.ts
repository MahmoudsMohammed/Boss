import { NgModule } from '@angular/core';
import { headerComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
@NgModule({
  declarations: [headerComponent],
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  exports: [headerComponent],
})
export class coreModule {}
