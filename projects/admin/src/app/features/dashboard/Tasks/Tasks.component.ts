import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './componets/dialog/dialog.component';
import { tasksDataTable } from './model/task.interface';
import { usersService } from '../../../core/services/users.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-Tasks',
  templateUrl: './Tasks.component.html',
  styleUrls: ['./Tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private userService: usersService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers();
  }

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

  clearFilters() {
    window.location.reload();
  }
}
