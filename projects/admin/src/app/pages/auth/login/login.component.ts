import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class loginComponent {
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
    }else if(this.form.get('password').hasError('maxlength')){
      return 'Password Max Length is 40'
    }else{
      return 'Password Min Length is 8'
    }
  }
}
