import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LoginPageComponent } from './login-page.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, MatCardModule, InputComponent, ButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule]
})
export class LoginPageModule {}
