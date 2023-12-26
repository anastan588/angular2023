import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';


const routesAdminPage: Routes = [
  {
    path: '',
    component: AdminPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routesAdminPage)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
