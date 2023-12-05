import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISingUp } from '../models/signup';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  url: string;
  constructor(
    public http: HttpClient,
    private toastMessage: MatSnackBar
  ) {
    this.url = 'registration';
  }

  sendRegistrationDataToServer(requestbody: ISingUp) {
    console.log(requestbody);
    return (
      this.http.post<ISingUp>(this.url, requestbody).subscribe(response => {
        console.log(response);
        return response;
      }),
      (error: Error) => {
        console.log(error.message);
        this.showToastMessage(error.message);
        return error.message;
      }
    );
  }

  showToastMessage(message: string) {
    this.toastMessage.open(message);
  }
}
