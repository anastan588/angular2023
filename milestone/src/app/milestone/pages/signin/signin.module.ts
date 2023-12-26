import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { SigninRoutingModule } from './signin-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ButtonComponent } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    MaterialModule,
    ButtonComponent,
    ReactiveFormsModule,
  ],
})
export class SigninModule {}
