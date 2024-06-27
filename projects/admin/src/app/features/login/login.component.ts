import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { loginRequest, loginResponse } from './login.models';
import { loginService } from './login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class loginComponent {
  hide = true;

  constructor(
    private authSer: loginService,
    private toastr: ToastrService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(40),
    ]),
  });

  // return error messages based on the error
  getEmailError() {
    if (this.form.get('email').hasError('required')) {
      return this.translateService.instant('login.emailErrors.required');
    }
    return this.form.get('email').hasError('email')
      ? this.translateService.instant('login.emailErrors.notValid')
      : '';
  }

  // return error messages based on the error
  getPasswordError() {
    if (this.form.get('password').hasError('required')) {
      return this.translateService.instant('login.passwordErrors.required');
    } else if (this.form.get('password').hasError('maxlength')) {
      return this.translateService.instant('login.passwordErrors.maxlength');
    } else {
      return this.translateService.instant('login.passwordErrors.minlength');
    }
  }

  // submit form and Login
  onSubmit() {
    // collect data from the form
    const data: loginRequest = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      role: 'admin',
    };
    this.authSer.login(data).subscribe(
      (res: loginResponse) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard/tasks']);
      },
      (err) => {
        this.form.reset({
          email: null,
          password: null,
        });
      }
    );
  }

  // toastr success
  showSuccess() {
    this.toastr.success(this.translateService.instant('toaster.login'));
  }
}
