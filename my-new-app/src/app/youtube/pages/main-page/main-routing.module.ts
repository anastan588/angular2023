import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routesMain: Routes = [
  {
    path: '',
    component: MainComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routesMain)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
