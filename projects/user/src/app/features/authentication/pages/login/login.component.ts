import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
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
import { AuthenticationService } from '../../services/authentication.service';
import { loginRequest } from '../../models/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService],
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

  // injection
  authServices = inject(AuthenticationService);

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

  onSubmit() {
    const data: loginRequest = {
      email: this.userLoginForm.value['email'],
      password: this.userLoginForm.value['password'],
      role: 'user',
    };

    this.authServices.userLogin(data).subscribe((res) => {
      console.log(res);
    });
  }
}
