import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from 'src/app/auth/auth.module';
import { YoutubeComponent } from './youtube.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderModule } from './components/header.module';
import { MatButtonModule } from '@angular/material/button';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';
import { MatCardModule } from '@angular/material/card';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { ButtonModule } from '../shared/components/button/button.module';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { DetailedPageModule } from './pages/detailed-page/detailed-page.module';
import { MainModule } from './pages/main-page/main.module';
import { BordersItemsDirective } from '../shared/directives/borders-items.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    YoutubeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    ButtonModule,
    HeaderModule,
    YoutubeRoutingModule,
    FooterComponent,
    BordersItemsDirective
  ],
  exports: [RouterModule],
})
export class YoutubeModule {
  constructor() {
    console.log('youtube module');
  }
}
