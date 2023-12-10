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
import {
  editUserName,
  loadMilestoneUserSuccess,
} from '../../store/milestone/milestone.actions';
import { selectUser } from '../../store/milestone/milestone.selectors';
import { IUserName } from '../../models/userUpdate';
import { ToastMessageService } from '../toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url: string;
  httpHeaders!: HttpHeaders;
  catchedUser!: Observable<IUser>;
  requestBodyForService$ = new Subject<IUserName>();
  requestBody$!: Observable<IUserName>;
  request!: IUserName;
  constructor(
    public http: HttpClient,
    private toastMessage: MatSnackBar,
    private router: Router,
    private store: Store,
    private toastmessageservice: ToastMessageService
  ) {
    this.url = 'profile';
    this.requestBody$ = this.requestBodyForService$.asObservable();
    const user = localStorage.getItem('user');
    const userRequestBody: IServerResponseSignIn = user
      ? JSON.parse(user)
      : null;
    if (userRequestBody !== null) {
      this.httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${userRequestBody.token}`,
        'rs-uid': `${userRequestBody.uid}`,
        'rs-email': `${userRequestBody.email}`,
      });
    }

    this.requestBodyForService$.subscribe(value => {
      this.request = value;
    });
  }

  getUsersData() {
    return this.http.get<IUser>(this.url, { headers: this.httpHeaders });
  }

  sentUsersNewData() {
    console.log(this.request);
    return this.http
      .put<IUser>(this.url, this.request, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(response => {
          this.toastmessageservice.showToastMessage(
            'Updating user name succeed',
            'close'
          );
          this.store.dispatch(editUserName({ nameS: this.request.name }));
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignUp = error.error;
          console.log(serverResponse.message);
          console.log(serverResponse.type);
          this.toastmessageservice.showToastMessage(
            'Updating user name failed: ' + serverResponse.message,
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

  getrequestBody() {
    return this.request;
  }

  getUserFromStore() {
    this.catchedUser = this.store.select(selectUser);
    console.log(this.catchedUser);
    console.log(this.requestBody$);
    return this.catchedUser;
  }
}
