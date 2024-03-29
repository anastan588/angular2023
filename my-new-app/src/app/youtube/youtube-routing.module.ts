import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from '../auth/login.guard';
import { YoutubeComponent } from './youtube.component';
import { favouriteGuard } from '../core/guards/favourite.guard';

const routesYoutube: Routes = [
  {
    path: '',
    component: YoutubeComponent,
    children: [
      {
        path: 'login',

        loadChildren: () =>
          import('./pages/login-page/login-page.module').then(
            m => m.LoginPageModule
          ),
      },
      {
        path: 'main',
        canActivate: [loginGuard],
        loadChildren: () =>
          import('./pages/main-page/main.module').then(m => m.MainModule),
      },
      {
        path: 'admin',
        canActivate: [loginGuard],
        loadChildren: () =>
          import('./pages/admin-page/admin-page.module').then(
            m => m.AdminPageModule
          ),
      },
      {
        path: 'favorite',
        canActivate: [favouriteGuard],
        loadChildren: () =>
          import('./pages/favorite-page/favorite-page.module').then(m => m.FavoritePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesYoutube)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
