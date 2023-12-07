import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignIn } from 'src/app/core/models/signin';
import { SigninService } from 'src/app/core/services/signin.service';
import { createPasswordValidator } from 'src/app/core/validators/password.validator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {
  isButtonDisabled!: boolean;
  duplicateEmail!: string;
  hide = true;
  signinForm = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
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
    private signinService: SigninService
  ) {
    this.isButtonDisabled = true;
  }

  ngOnInit() {
    this.signinForm.valueChanges.subscribe(() => {
      this.isButtonDisabled = this.signinForm.invalid;
    });
    // this.signupService.isDisabledButton$.subscribe(value => {
    //   this.isButtonDisabled = value;
    // });
  }

  signinUser(): ISignIn {
    const signup: ISignIn = {
      email: this.signinForm.value.email!,
      password: this.signinForm.value.password!,
    };
    return signup;
  }

  sendUserToServer() {
    const user = this.signinUser();
    this.isButtonDisabled = true;
    this.signinService.sendSignInDataToServer(user);
  }

  redirectSignup() {
    this.router.navigate(['signup']);
  }

  ngOnDestroy() {
    // this.signupService.isDisabledButtonObject$.unsubscribe();
    // this.signupService.isDisabledButtonObject$.unsubscribe();
  }
}
