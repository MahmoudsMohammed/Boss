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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent implements OnInit {
  hide = signal(true);
  passwordError = signal<string>('');
  emailError = signal<string>('');
  userLoginForm: FormGroup;

  ngOnInit() {
    this.userLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  updateEmailErrorMessage() {
    if (this.userLoginForm.get('email').hasError('required')) {
      this.emailError.set('Email is Required');
    } else if (this.userLoginForm.get('email').hasError('email')) {
      this.emailError.set('Invalid email format');
    }
  }

  updatePasswordErrorMessage() {
    if (this.userLoginForm.get('password').hasError('required')) {
      this.passwordError.set('Password is Required');
    } else if (this.userLoginForm.get('password').hasError('minLength')) {
      this.passwordError.set('Password min length is 8 letters');
    }
  }
}
