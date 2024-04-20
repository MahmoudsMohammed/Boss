import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { usersService } from '../../../../core/services/users.service';

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

  constructor(private userSer: usersService) {
    this.userSer.getUsers();
  }

  ngOnInit() {
    // task form initialization
    this.taskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      user: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.taskForm.value);
  }
}
