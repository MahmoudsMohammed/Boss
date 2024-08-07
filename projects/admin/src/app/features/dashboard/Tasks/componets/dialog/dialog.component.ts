import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tasksService } from '../../services/tasks.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { tasksDataTable } from '../../model/task.interface';
import { usersService } from '../../../../../core/services/users.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { user } from '../../../../../core/model/user.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  taskForm: FormGroup;
  users: user[];
  dialogRef: MatDialogRef<DialogComponent>;

  constructor(
    private userSer: usersService,
    private taskSer: tasksService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: tasksDataTable
  ) {
    this.dialogRef = inject(MatDialogRef);
  }

  ngOnInit() {
    // set users from users signal
    this.users = this.userSer.users();
    // task form initialization
    this.taskForm = new FormGroup({
      title: new FormControl(this.data?.title || null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      userId: new FormControl(this.data?.userId || null, Validators.required),
      description: new FormControl(
        this.data?.description || null,
        Validators.required
      ),
      deadline: new FormControl(
        this.data ? new Date(this.data?.deadline) : null,
        Validators.required
      ),
      image: new FormControl(this.data?.image || null, Validators.required),
    });
  }

  // set chosen file as value for the input image
  onFileChange(e: Event) {
    this.taskForm
      .get('image')
      .setValue((e.target as HTMLInputElement).files[0]);
  }
  // when create or update
  onSubmit() {
    const data = new FormData();
    // loop over form values and set as key and value in form data
    Object.entries(this.taskForm.value).forEach(
      (ele: [key: string, value: any]) => {
        data.append(ele[0], ele[1]);
      }
    );
    // update or add passed on there is data passed or not
    if (this.data && this.hasUpdate()) {
      this.taskSer.updateTask(data, this.data.id);
    } else if (!this.data) {
      this.taskSer.addTask(data);
    }
  }
  // when close the dialog
  onClose() {
    const hasUpdated = this.hasUpdate();
    // check if hasUpdated or Not
    if (hasUpdated) {
      // if updated open confirm dialog
      this.dialog.open(ConfirmDialogComponent, { disableClose: true });
    } else {
      // if not close the dialog
      this.dialogRef.close();
    }
  }

  // hasUpdate function to check if the task data updated or not
  hasUpdate() {
    let hasUpdated = false;
    Object.keys(this.taskForm.value).forEach((e) => {
      // check if there is pass data
      if (this.data) {
        // check for deadline to compare strings not date object
        if (e === 'deadline') {
          if (this.data[e] !== String(this.taskForm.value[e])) {
            hasUpdated = true;
          }
        }
        // other key compare strings
        else if (this.data[e] !== this.taskForm.value[e]) {
          hasUpdated = true;
        }
      } else {
        // check if there is no data passed
        if (this.taskForm.value[e]) {
          hasUpdated = true;
        }
      }
    });
    return hasUpdated;
  }
}
