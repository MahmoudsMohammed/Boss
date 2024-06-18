import { TasksComponent } from './Tasks.component';
import { NgModule } from '@angular/core';
import { sharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './componets/dialog/dialog.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { tasksService } from './services/tasks.service';
import { FilteringComponent } from './componets/filtering/filtering.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './componets/data-table/data-table.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    FilteringComponent,
    TasksComponent,
    DialogComponent,
    DataTableComponent,
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
