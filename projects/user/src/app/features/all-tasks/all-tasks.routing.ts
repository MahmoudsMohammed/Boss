import { AllTasksComponent } from './all-tasks.component';
import { Routes } from '@angular/router';
export const allTasksRouting: Routes = [
  { path: '', component: AllTasksComponent, children: [] },
];
