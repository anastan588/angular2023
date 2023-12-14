import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DefaultpageService } from './core/services/defaultpage/defaultpage.service';
import { mainGuard } from './core/guards/main.guard';
import { MainComponent } from './milestone';

const routes: Routes = [
  {
    path: '',
    canActivate: [mainGuard],
    loadChildren: () =>
      import('./milestone/pages/main/main.module').then(m => m.MainModule),
  },

  // {
  //   path: 'main',
  //   canActivate: [mainGuard],
  //   loadChildren: () =>
  //     import('./milestone/pages/main/main.module').then(m => m.MainModule),
  // },
  {
    path: 'signup',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./milestone/pages/signup/signup.module').then(
        m => m.SignupModule
      ),
  },
  {
    path: 'signin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./milestone/pages/signin/signin.module').then(
        m => m.SigninModule
      ),
  },
  {
    path: 'profile',
    canActivate: [mainGuard],
    loadChildren: () =>
      import('./milestone/pages/profile/profile.module').then(
        m => m.ProfileModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./shared/pages/not-found/not-found.module').then(
        m => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private defaultRouteService: DefaultpageService) {
    // const defaultRoute = this.defaultRouteService.getDefaultRoute();
    // console.log(defaultRoute);
    // routes[0].redirectTo = defaultRoute;
    // console.log(routes[0].redirectTo);
  }
}
