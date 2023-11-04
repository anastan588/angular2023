import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from 'src/app/auth/auth.module';
import { MainModule } from './pages/main-page/main/main.module';
import { YoutubeComponent } from './youtube.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderModule } from './components/header.module';
import { MatButtonModule } from '@angular/material/button';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { ButtonModule } from '../shared/components/button/button.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [YoutubeComponent, FooterComponent, DetailedPageComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    RouterModule,
    HeaderModule,
    MainModule,
    MatButtonModule,
    LoginPageModule,
    MatCardModule
  ],
  exports: [RouterModule],
})
export class YoutubeModule {}
