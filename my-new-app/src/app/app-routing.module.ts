import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./youtube/youtube.module').then(m => m.YoutubeModule),
  },

  {
    path: '**',
    loadChildren: () =>
      import('./shared/pages/not-found/not-found-page.module').then(
        m => m.NotFoundPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
