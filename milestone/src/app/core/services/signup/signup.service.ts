import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISingUp } from '../../models/signup';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  of,
} from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IServerResponseSignUp } from '../../models/serverresponse';
import { ToastMessageService } from '../toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  url: string;
  isDisabledButtonObject$ = new Subject<boolean>();
  isDisabledButton$!: Observable<boolean>;
  duplicateEmailObject$ = new BehaviorSubject<string>('');
  duplicateEmail$!: Observable<string>;

  constructor(
    public http: HttpClient,
    private toastMessage: MatSnackBar,
    private router: Router,
    private toastMessageService: ToastMessageService
  ) {
    this.url = 'registration';
    this.isDisabledButton$ = this.isDisabledButtonObject$.asObservable();
    this.isDisabledButtonObject$.next(true);
    this.duplicateEmail$ = this.duplicateEmailObject$.asObservable();
  }

  sendRegistrationDataToServer(requestbody: ISingUp) {
    console.log(requestbody);
    return this.http
      .post<IServerResponseSignUp>(this.url, requestbody)
      .pipe(
        map(response => {
          this.toastMessageService.showToastMessage(
            'Registration succeed',
            'close'
          );
          this.router.navigate(['signin']);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignUp = error.error;
          console.log(serverResponse.message);
          console.log(serverResponse.type);
          if (serverResponse.type === 'PrimaryDuplicationException') {
            this.isDisabledButtonObject$.next(true);
            this.duplicateEmailObject$.next(requestbody.email);
          }
          this.toastMessageService.showToastMessage(
            'Registration failed: ' + serverResponse.message,
            'close'
          );
          return of({
            type: serverResponse.type,
            message: serverResponse.message,
          });
        })
      )
      .subscribe(value => {
        return value;
      });
  }
}
