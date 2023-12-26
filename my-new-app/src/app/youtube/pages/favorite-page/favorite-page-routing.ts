import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritePageComponent } from './favorite-page.component';

const routesFavorites: Routes = [
  {
    path: '',
    component: FavoritePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesFavorites)],
  exports: [RouterModule],
})
export class FavoriteRoutingModule {}
