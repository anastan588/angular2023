import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YoutubeComponent } from './youtube/youtube.component';
import { LoginPageComponent } from './youtube/pages/login-page/login-page.component';
import { MainComponent } from './youtube/pages/main-page/main/main.component';
import { DetailedPageComponent } from './youtube/pages/detailed-page/detailed-page.component';

const routes: Routes = [
  {
    path: '',
    component: YoutubeComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      { path: 'main', component: MainComponent },
      { path: 'detailed/:id', component: DetailedPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
