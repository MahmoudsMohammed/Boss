import { NgModule } from '@angular/core';
import { materialModule } from './modules/materila.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [materialModule, MatTableModule, MatPaginatorModule, MatSortModule],
  exports: [materialModule, CommonModule, ReactiveFormsModule],
})
export class sharedModule {}
