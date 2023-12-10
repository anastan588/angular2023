import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  IServerResponseSignIn,
  IServerResponseSignUp,
} from '../../models/serverresponse';
import { IUser } from '../../models/user';
import { Observable, catchError, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadMilestoneUserSuccess } from '../../store/milestone/milestone.actions';
import { selectUser } from '../../store/milestone/milestone.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url: string;
  httpHeaders!: HttpHeaders;
  catchedUser!: Observable<IUser>;
  constructor(
    public http: HttpClient,
    private toastMessage: MatSnackBar,
    private router: Router,
    private store: Store
  ) {
    this.url = 'profile';
    const user = localStorage.getItem('user');
    const userRequestBody: IServerResponseSignIn = user
      ? JSON.parse(user)
      : null;
    this.httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${userRequestBody.token}`,
      'rs-uid': `${userRequestBody.uid}`,
      'rs-email': `${userRequestBody.email}`,
    });
  }

  getUsersData() {
    return this.http.get<IUser>(this.url, { headers: this.httpHeaders });
  }

  getUserFromStore() {
    this.catchedUser = this.store.select(selectUser);
    console.log(this.catchedUser);
    return this.catchedUser;
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
