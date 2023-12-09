import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth/auth.service';
import { DefaultpageService } from './core/services/defaultpage/defaultpage.service';
import { mainGuard } from './core/guards/main.guard';

const routes: Routes = [
  {
    path: 'main',
    canActivate: [mainGuard],
    loadChildren: () =>
      import('./milestone/pages/main/main.module').then(m => m.MainModule),
  },
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
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private defaultRouteService: DefaultpageService) {
    const defaultRoute = this.defaultRouteService.getDefaultRoute();
    console.log(defaultRoute);
    routes[3].redirectTo = defaultRoute;
    console.log(routes[3].redirectTo);
  }
}
