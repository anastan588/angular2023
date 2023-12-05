import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ISingUp } from 'src/app/core/models/signup';
import { createPasswordValidator } from 'src/app/core/validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  hide = true;
  signupForm = this.fb.group({
    firstName: ['', { validators: [Validators.required] }],
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: [
      '',
      {
        validators: [Validators.required, createPasswordValidator()],
      },
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  signupUser(): ISingUp {
    const signup: ISingUp = {
      firstname: this.signupForm.value.firstName!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!,
    };
    return signup;
  }

  setUser() {
    const user = this.signupUser();
    console.log(user);
  }

  redirectSignin() {
    this.router.navigate(['signin'])
  }
}
