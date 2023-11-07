import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedPageComponent } from './detailed-page.component';


const routesDetailed: Routes = [
  {
    path: '',
    component: DetailedPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routesDetailed)],
  exports: [RouterModule],
})
export class DetailedRoutingModule {}
