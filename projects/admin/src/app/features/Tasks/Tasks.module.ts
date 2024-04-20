import { TasksComponent } from './Tasks.component';
import { NgModule } from '@angular/core';
import { sharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './componets/dialog/dialog.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { tasksService } from './services/tasks.service';
import { FilteringComponent } from './componets/filtering/filtering.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilteringComponent, TasksComponent, DialogComponent],
  imports: [
    sharedModule,
    RouterModule.forChild([{ path: '', component: TasksComponent }]),
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter(), tasksService],
  exports: [RouterModule],
})
export class TasksModule {}
