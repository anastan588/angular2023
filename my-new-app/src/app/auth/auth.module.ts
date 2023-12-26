import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from '../youtube/pages/login-page/login-page.component';
import { loginGuard } from './login.guard';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AuthModule {}
