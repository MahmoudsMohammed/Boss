import { TasksComponent } from './Tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { tasksService } from './services/tasks.service';
import { FilteringComponent } from './componets/filtering/filtering.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './componets/data-table/data-table.component';
import { DatePipe } from '@angular/common';
import { sharedModule } from '../../../shared/shared.module';
import { DialogComponent } from './componets/dialog/dialog.component';
import { ConfirmDialogComponent } from './componets/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    FilteringComponent,
    TasksComponent,
    DataTableComponent,
    DialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    sharedModule,
    RouterModule.forChild([{ path: '', component: TasksComponent }]),
    ReactiveFormsModule,
    DatePipe,
  ],
  providers: [provideNativeDateAdapter(), tasksService],
  exports: [RouterModule],
})
export class TasksModule {}
