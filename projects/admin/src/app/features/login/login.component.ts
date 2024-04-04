import { Component, effect } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { loginRequest } from './login.models';
import { loginService } from './login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class loginComponent {
  hide = true;

  constructor(
    private authSer: loginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    effect(() => {
      if (this.authSer.requestFinish()) {
        this.spinner.hide();
      }
    });
    effect(() => {
      if (this.authSer.requestError() !== '') {
        this.showError(this.authSer.requestError());
      }
    });

    effect(() => {
      if (this.authSer.userToken() !== '') {
        this.showSuccess();
        this.router.navigate(['/tasks']);
      }
    });
  }

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
    this.spinner.show();
    this.authSer.login(data);
  }

  // toastr success
  showSuccess() {
    this.toastr.success('Successful Login', 'Welcome Boss 🙂');
  }

  // toastr error
  showError(m: string) {
    this.toastr.error(m, 'Login Failed 😔');
  }
}
