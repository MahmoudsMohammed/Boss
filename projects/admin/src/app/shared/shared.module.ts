import { NgModule } from '@angular/core';
import { materialModule } from './modules/materila.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [materialModule],
  exports: [materialModule, CommonModule, ReactiveFormsModule],
})
export class sharedModule {}
