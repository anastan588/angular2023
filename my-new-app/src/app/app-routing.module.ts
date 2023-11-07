import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YoutubeComponent } from './youtube/youtube.component';
import { LoginPageComponent } from './youtube/pages/login-page/login-page.component';
import { MainComponent } from './youtube/pages/main-page/main.component';
import { DetailedPageComponent } from './youtube/pages/detailed-page/detailed-page.component';
import { NotFoundPageComponent } from './youtube/pages/not-found/not-found-page.component';
import { loginGuard } from './auth/login.guard';
import { LoginPageModule } from './youtube/pages/login-page/login-page.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./youtube/youtube.module').then(m => m.YoutubeModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./youtube/pages/not-found/not-found-page.module').then(
        m => m.NotFoundPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
