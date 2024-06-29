import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  hide = signal(true);
  hideConfirm = signal(true);
  userError = signal<string>('');
  emailError = signal<string>('');
  passwordError = signal<string>('');
  confirmError = signal<string>('');
  createUserForm: FormGroup;

  ngOnInit() {
    this.createUserForm = new FormGroup({
      user: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirm: new FormControl('', Validators.required),
    });
  }

  updateUserError() {
    if (this.createUserForm.get('user').hasError('required')) {
      this.userError.set('User name is required');
    }
  }

  updateEmailError() {
    if (this.createUserForm.get('email').hasError('required')) {
      this.emailError.set('Email is Required');
    } else if (this.createUserForm.get('email').hasError('email')) {
      this.emailError.set('Invalid email format');
    }
  }

  updatePasswordError() {
    if (this.createUserForm.get('password').hasError('required')) {
      this.passwordError.set('Password is Required');
    } else if (this.createUserForm.get('password').hasError('minLength')) {
      this.passwordError.set('Password min length is 8 letters');
    }
  }

  updateConfirmError() {
    if (this.createUserForm.get('confirm').hasError('required')) {
      this.passwordError.set('Please confirm password');
    }
  }
}
