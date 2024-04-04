import { NgModule } from '@angular/core';
import { headerComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@NgModule({
  declarations: [headerComponent],
  imports: [MatIconModule, RouterLink],
  exports: [headerComponent],
})
export class coreModule {}
