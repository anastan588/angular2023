import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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


  getUsersData() {
    
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
