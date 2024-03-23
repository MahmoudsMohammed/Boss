import { TasksComponent } from './Tasks.component';
import { NgModule } from '@angular/core';
import { sharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    sharedModule,
    RouterModule.forChild([{ path: '', component: TasksComponent }]),
  ],
  exports: [RouterModule],
})
export class TasksModule {}
