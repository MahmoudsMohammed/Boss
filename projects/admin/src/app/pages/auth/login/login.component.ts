import { loginRequest } from './../auth.models';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { authService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class loginComponent {
  constructor(private authSer: authService, private toastr: ToastrService) {}
  hide = true;

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(40),
    ]),
  });

  getEmailError() {
    if (this.form.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordError() {
    if (this.form.get('password').hasError('required')) {
      return 'You must enter a value';
    } else if (this.form.get('password').hasError('maxlength')) {
      return 'Password Max Length is 40';
    } else {
      return 'Password Min Length is 8';
    }
  }

  // submit form and Login
  onSubmit() {
    const data: loginRequest = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      role: 'admin',
    };
    this.authSer.login(data).subscribe(
      (res) => {
        console.log(res);
        this.showSuccess();
      },
      (err) => {
        console.log(err);
        this.showError(err.error.message);
      }
    );
  }

  // toastr success
  showSuccess() {
    this.toastr.success('Successful Login', 'Welcome 🙂');
  }

  // toastr error
  showError(m: string) {
    this.toastr.error(m, 'Login Failed 🙂');
  }
}
