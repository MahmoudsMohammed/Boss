import { TasksComponent } from './Tasks.component';
import { NgModule } from '@angular/core';
import { sharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './componets/dialog/dialog.component';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [TasksComponent, DialogComponent],
  imports: [
    sharedModule,
    RouterModule.forChild([{ path: '', component: TasksComponent }]),
  ],
  providers: [provideNativeDateAdapter()],
  exports: [RouterModule],
})
export class TasksModule {}
