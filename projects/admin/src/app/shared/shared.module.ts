import { NgModule } from '@angular/core';
import { materialModule } from './modules/materila.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { coreModule } from '../core/core.module';
import { RouterOutlet } from '@angular/router';

@NgModule({
  imports: [
    materialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    coreModule,
    RouterOutlet,
  ],
  exports: [materialModule, CommonModule, ReactiveFormsModule],
})
export class sharedModule {}
