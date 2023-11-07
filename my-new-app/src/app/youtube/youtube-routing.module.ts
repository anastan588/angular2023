import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from '../auth/login.guard';
import { YoutubeComponent } from './youtube.component';

const routesYoutube: Routes = [
  {
    path: '',
    component: YoutubeComponent,
    children: [
      {
        path: 'login',
        canActivate: [loginGuard],
        loadChildren: () =>
          import('./pages/login-page/login-page.module').then(
            m => m.LoginPageModule
          ),
      },
      {
        path: 'main',
        loadChildren: () =>
          import('./pages/main-page/main.module').then(m => m.MainModule),
      },
      {
        path: 'detailed/:id',
        loadChildren: () =>
          import('./pages/detailed-page/detailed-page.module').then(
            m => m.DetailedPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesYoutube)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
