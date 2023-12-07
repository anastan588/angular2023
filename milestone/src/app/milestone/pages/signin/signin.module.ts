import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { SigninRoutingModule } from './signin-routing.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, SigninRoutingModule],
})
export class SigninModule {}
