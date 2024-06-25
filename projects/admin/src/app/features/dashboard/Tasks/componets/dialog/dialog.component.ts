import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  computed,
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

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  taskForm: FormGroup;
  users = computed(() =>
    this.userSer.users().filter((user) => user.role !== 'admin')
  );
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
    console.log(this.data);
    // call function to get all users and update users signal
    this.userSer.getUsers();
    // task form initialization
    this.taskForm = new FormGroup({
      Title: new FormControl(this.data?.Title || null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      userId: new FormControl(this.data?.userId || null, Validators.required),
      Description: new FormControl(
        this.data?.Description || null,
        Validators.required
      ),
      DeadLine: new FormControl(
        this.data ? new Date(this.data?.DeadLine) : null,
        Validators.required
      ),
      Image: new FormControl(this.data?.Image || null, Validators.required),
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
    if (this.data) {
    } else {
      this.taskSer.addTask(data);
    }
  }
  // when close the dialog
  onClose() {
    let hasUpdated = false;
    Object.keys(this.taskForm.value).forEach((e) => {
      // check if there is pass data
      if (this.data) {
        // check for deadline to compare strings not date object
        if (e === 'DeadLine') {
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
        if (this.taskForm.value[e] !== null) {
          hasUpdated = true;
        }
      }
    });

    // check if hasUpdated or Not
    if (hasUpdated) {
      // if updated open confirm dialog
      this.dialog.open(ConfirmDialogComponent, { disableClose: true });
    } else {
      // if not close the dialog
      this.dialogRef.close();
    }
  }
}
