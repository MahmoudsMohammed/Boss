import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { usersService } from '../../../../core/services/users.service';
import { tasksService } from '../../services/tasks.service';

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

  constructor(private userSer: usersService, private taskSer: tasksService) {
    // call function to get all users and update users signal
    this.userSer.getUsers();
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

  onFileChange(e: Event) {
    this.taskForm
      .get('image')
      .setValue((e.target as HTMLInputElement).files[0]);
  }
  onSubmit() {
    const data = new FormData();
    Object.entries(this.taskForm.value).forEach(
      (ele: [key: string, value: any]) => {
        data.append(ele[0], ele[1]);
      }
    );
    this.taskSer.addTask(data);
  }
}
