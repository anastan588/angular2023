import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { loginGuard } from 'src/app/auth/login.guard';

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
