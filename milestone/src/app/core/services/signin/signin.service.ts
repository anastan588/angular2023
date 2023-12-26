import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  of,
} from 'rxjs';
import { ISignIn } from '../../models/signin';
import { IServerResponseSignIn } from '../../models/serverresponse';
import { ToastMessageService } from '../toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  url: string;
  userStatusObject$ = new BehaviorSubject<string>('Login');
  isDisabledButtonObject$ = new Subject<boolean>();
  isDisabledButton$!: Observable<boolean>;
  notFoundEmailObject$ = new BehaviorSubject<string>('');
  notFoundEmail$!: Observable<string>;

  constructor(
    public http: HttpClient,
    private toastMessage: MatSnackBar,
    private router: Router,
    private toastMessageService: ToastMessageService
  ) {
    this.url = 'login';
    this.isDisabledButton$ = this.isDisabledButtonObject$.asObservable();
    this.isDisabledButtonObject$.next(true);
    this.notFoundEmail$ = this.notFoundEmailObject$.asObservable();
  }

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this.userStatusObject$.next('LogOut');
      console.log('logout');
    }
  }


  setDataToLocalStorage(user: IServerResponseSignIn) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  sendSignInDataToServer(requestbody: ISignIn) {
    console.log(requestbody);

    return this.http
      .post<IServerResponseSignIn>(this.url, requestbody)
      .pipe(
        map(response => {
          this.toastMessageService.showToastMessage('Singing in succeed', 'close');
          this.router.navigate(['/']);
          response.email = requestbody.email;
          this.setDataToLocalStorage(response);
          this.userStatusObject$.next('Logout');
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignIn = error.error;
          console.log(serverResponse.message);
          console.log(serverResponse.type);
          if (serverResponse.type === 'NotFoundException') {
            this.isDisabledButtonObject$.next(true);
            this.notFoundEmailObject$.next(requestbody.email);
          }
          this.toastMessageService.showToastMessage(
            'Signing in failed: ' + serverResponse.message,
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
