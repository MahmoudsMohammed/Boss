import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

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
    RouterLink,
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
      confirm: new FormControl(''),
    });

    // set validation for confirm password
    this.createUserForm
      .get('confirm')
      .setValidators([
        Validators.required,
        this.matchValidator(this.createUserForm.value['password']),
      ]);
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
    } else if (this.createUserForm.get('password').hasError('minlength')) {
      this.passwordError.set('Password min length is 8 letters');
    }
  }

  updateConfirmError() {
    console.log(this.createUserForm.get('confirm').hasError('notMatch'));
    if (this.createUserForm.get('confirm').hasError('required')) {
      this.confirmError.set('Please confirm password');
    } else if (this.createUserForm.get('confirm').hasError('notMatch')) {
      this.confirmError.set('Password not Match');
    }
    console.log(this.confirmError());
  }

  matchValidator(password: string): ValidatorFn {
    return (control: AbstractControl): { [e: string]: boolean } | null => {
      if (password !== control.value) {
        return { notMatch: true };
      }
      return null;
    };
  }
}
