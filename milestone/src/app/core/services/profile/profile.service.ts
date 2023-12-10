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
import { ResolveFn, Router } from '@angular/router';
import {
  IServerResponseSignIn,
  IServerResponseSignUp,
} from '../../models/serverresponse';
import { IUser } from '../../models/user';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadMilestoneUserSuccess } from '../../store/milestone/milestone.actions';
import { selectUser } from '../../store/milestone/milestone.selectors';
import { IUserName } from '../../models/userUpdate';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url: string;
  httpHeaders!: HttpHeaders;
  catchedUser!: Observable<IUser>;
  requestBodyForService$ = new Subject<IUserName>();
  request!: IUserName;
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
    this.requestBodyForService$.subscribe(value => {
      this.request = value;
    });
  }

  getUsersData() {
    console.log(this.request);
    if (this.request === undefined) {
      return this.http.get<IUser>(this.url, { headers: this.httpHeaders });
    }
    return this.http.put<IUser>(this.url, this.request, {
      headers: this.httpHeaders,
    });
  }

  getrequestBody() {
    return this.request;
  }

  getUserFromStore() {
    this.catchedUser = this.store.select(selectUser);
    console.log(this.catchedUser);
    return this.catchedUser;
  }
}
