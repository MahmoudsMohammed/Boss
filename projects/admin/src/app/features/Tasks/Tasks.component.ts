import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './componets/dialog/dialog.component';
import { tasksService } from './services/tasks.service';

@Component({
  selector: 'app-Tasks',
  templateUrl: './Tasks.component.html',
  styleUrls: ['./Tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  constructor(public dialog: MatDialog, private tasksService: tasksService) {
    this.tasksService.getAllTasks();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
