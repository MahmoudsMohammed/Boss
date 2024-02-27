import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  exports:[MatButtonModule,MatFormFieldModule]
})
export class materialModule{}