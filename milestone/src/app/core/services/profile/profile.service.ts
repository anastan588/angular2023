import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IServerResponseSignIn, IServerResponseSignUp } from '../../models/serverresponse';
import { IUser } from '../../models/user';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url: string;
  constructor(
    public http: HttpClient,
    private toastMessage: MatSnackBar,
    private router: Router
  ) {
    this.url = 'profile';
  }


  getUsersData(requestbody: IServerResponseSignIn) {
    console.log(requestbody);
    return this.http
      .get<IUser>(this.url, requestbody)
      .pipe(
        map(response => {
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignUp = error.error;
          console.log(serverResponse.message);
          console.log(serverResponse.type);
          if (serverResponse.type === 'PrimaryDuplicationException') {
            
          }
          this.showToastMessage(
            'Registration failed: ' + serverResponse.message,
            'close'
          );
          return of({ type: serverResponse.type, message: serverResponse.message });
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
