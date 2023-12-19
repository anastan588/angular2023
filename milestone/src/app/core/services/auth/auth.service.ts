import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastMessageService } from '../toast-message.service';
import {
  IServerResponseSignIn,
  IServerResponseSignUp,
} from '../../models/serverresponse';
import { Subject, catchError, map, of } from 'rxjs';
import { loadMilestoneUser } from '../../store/milestone/milestone.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn!: boolean;
  httpHeaders!: HttpHeaders;
  userStatusObject$ = new Subject<string>();
  isButtonDisabledObject$ = new Subject<boolean>();
  url: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
    private store: Store
  ) {
    this.isLoggedIn = false;
    this.url = 'logout';
  }

  quitFromApplication() {
    const user = localStorage.getItem('user');
    console.log(user);
    const userRequestBody: IServerResponseSignIn = user
      ? JSON.parse(user)
      : null;

    this.httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${userRequestBody.token}`,
      'rs-uid': `${userRequestBody.uid}`,
      'rs-email': `${userRequestBody.email}`,
    });
    return this.http
      .delete<IServerResponseSignUp>(this.url, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(response => {
          this.toastMessageService.showToastMessage('Logout succeed', 'close');
          this.userStatusObject$.next('Login');
          localStorage.removeItem('user');
          localStorage.removeItem('currentGroup');
          this.store.dispatch(loadMilestoneUser());
          this.isButtonDisabledObject$.next(false);
          this.router.navigate(['signin']);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignUp = error.error;
          this.toastMessageService.showToastMessage(
            'Logout failed: ' + serverResponse.message,
            'close'
          );
          this.isButtonDisabledObject$.next(false);
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

  getLocalStorageData(): boolean {
    const user = localStorage.getItem('user');
    if (user !== null) {
      this.isLoggedIn = true;
    }
    console.log(this.isLoggedIn);
    return this.isLoggedIn;
  }

  getDefaultRoute(): string {
    this.getLocalStorageData();
    if (this.isLoggedIn === false) {
      this.router.navigate(['signin']);
    } else if (this.isLoggedIn === true) {
      this.router.navigate(['/']);
    }
    if (this.isLoggedIn) {
      return '/';
    } 
    return '';
  }
}
