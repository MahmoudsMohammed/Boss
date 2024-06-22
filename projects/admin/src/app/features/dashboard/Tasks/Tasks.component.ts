import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './componets/dialog/dialog.component';
import { tasksDataTable } from './model/task.interface';

@Component({
  selector: 'app-Tasks',
  templateUrl: './Tasks.component.html',
  styleUrls: ['./Tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data?: tasksDataTable
  ): void {
    this.dialog.open(DialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data,
    });
  }

  updateTask(e: tasksDataTable) {
    this.openDialog('300ms', '0ms', e);
  }
}
