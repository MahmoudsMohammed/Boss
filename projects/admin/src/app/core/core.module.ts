import { NgModule } from '@angular/core';
import { headerComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [headerComponent],
  imports: [MatIconModule],
  exports: [headerComponent],
})
export class coreModule {}
