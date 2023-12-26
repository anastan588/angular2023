import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page.component';

const routesNotFound: Routes = [
  {
    path: '',
    component: NotFoundPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routesNotFound)],
  exports: [RouterModule],
})
export class NotFoundRoutingModule {}
