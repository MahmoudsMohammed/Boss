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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tasksDataTable } from '../../model/task.interface';
import { usersService } from '../../../../../core/services/users.service';

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
    @Inject(MAT_DIALOG_DATA) private data: tasksDataTable
  ) {
    // call function to get all users and update users signal
    this.userSer.getUsers();
    this.dialogRef = inject(MatDialogRef);
  }

  ngOnInit() {
    // task form initialization
    this.taskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      userId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }

  // set chosen file as value for the input image
  onFileChange(e: Event) {
    this.taskForm
      .get('image')
      .setValue((e.target as HTMLInputElement).files[0]);
  }
  onSubmit() {
    const data = new FormData();
    // loop over form values and set as key and value in form data
    Object.entries(this.taskForm.value).forEach(
      (ele: [key: string, value: any]) => {
        data.append(ele[0], ele[1]);
      }
    );
    this.taskSer.addTask(data);
  }
}