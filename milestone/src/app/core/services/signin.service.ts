import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { ISignIn } from '../models/signin';
import { IServerResponse } from '../models/serverresponse';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  url: string;
  isDisabledButtonObject$ = new Subject<boolean>();
  isDisabledButton$!: Observable<boolean>;
  constructor(
    public http: HttpClient,
    private toastMessage: MatSnackBar,
    private router: Router
  ) {
    this.url = 'login';
  }

  setDataToLocalStorage(user: ISignIn) {
    localStorage.setItem('singin', JSON.stringify(user));
  }

  sendSignInDataToServer(requestbody: ISignIn) {
    console.log(requestbody);
    this.setDataToLocalStorage(requestbody);
    return this.http
      .post<IServerResponse>(this.url, requestbody)
      .pipe(
        map(response => {
          this.showToastMessage('Singing in succeed', 'close');
          this.router.navigate(['main']);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponse = error.error;
          console.log(serverResponse.message);
          console.log(serverResponse.type);
          this.showToastMessage(
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

  showToastMessage(
    message: string,
    action: string,
    position: {
      horizontal: MatSnackBarHorizontalPosition;
      vertical: MatSnackBarVerticalPosition;
    } = { horizontal: 'center', vertical: 'top' }
  ) {
    this.toastMessage.open(message, action, {
      duration: 5000,
      horizontalPosition: position.horizontal,
      verticalPosition: position.vertical,
      panelClass: 'snackbar',
    });
  }
}
