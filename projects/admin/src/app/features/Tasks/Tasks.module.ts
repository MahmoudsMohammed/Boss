import { TasksComponent } from './Tasks.component';
import { NgModule } from '@angular/core';
import { sharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './componets/dialog/dialog.component';

@NgModule({
  declarations: [TasksComponent, DialogComponent],
  imports: [
    sharedModule,
    RouterModule.forChild([{ path: '', component: TasksComponent }]),
  ],
  exports: [RouterModule],
})
export class TasksModule {}
