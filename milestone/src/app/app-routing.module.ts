import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./milestone/pages/signup/signup.module').then(
        m => m.SignupModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./milestone/pages/signin/signin.module').then(
        m => m.SigninModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
