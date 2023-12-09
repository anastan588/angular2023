import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISingUp } from 'src/app/core/models/signup';
import { createPasswordValidator } from 'src/app/core/validators/password.validator';
import { SignupService } from 'src/app/core/services/signup.service';
import { createEmailValidator } from 'src/app/core/validators/email.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  isButtonDisabled!: boolean;
  duplicateEmail!: string;
  hide = true;
  signupForm = this.fb.group({
    name: ['', { validators: [Validators.required] }],
    email: [
      '',
      {
        validators: [
          Validators.required,
          createEmailValidator(this.duplicateEmail),
        ],
      },
    ],
    password: [
      '',
      {
        validators: [Validators.required, createPasswordValidator()],
      },
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignupService
  ) {
    this.isButtonDisabled = true;
    
  }

  ngOnInit() {
    this.signupForm.valueChanges.subscribe(() => {
      this.isButtonDisabled = this.signupForm.invalid;
    });
    this.signupService.isDisabledButton$.subscribe(value => {
      this.isButtonDisabled = value;
    });
    this.signupService.duplicateEmail$.subscribe(value => {
      this.duplicateEmail = value;
      this.signupForm.get('email')?.setValidators([
        Validators.required,
        createEmailValidator(this.duplicateEmail)
      ]);
    });
  }

  signupUser(): ISingUp {
    const signup: ISingUp = {
      name: this.signupForm.value.name!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!,
    };
    return signup;
  }

  sendUserToServer() {
    const user = this.signupUser();
    this.isButtonDisabled = true;
    this.signupService.sendRegistrationDataToServer(user);
  }

  redirectSignin() {
    this.router.navigate(['signin']);
  }

  ngOnDestroy() {
    this.signupService.isDisabledButtonObject$.unsubscribe();
    this.signupService.duplicateEmailObject$.unsubscribe();
  }
}
