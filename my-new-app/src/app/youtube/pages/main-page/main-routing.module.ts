import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { loginGuard } from 'src/app/auth/login.guard';
import { ApiService } from 'src/app/core/services/api/api.service';
import { detailedPageResolver } from 'src/app/core/resolvers/detailed-page.resolver';

const routesMain: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'detailed/:id',
    resolve: {
      video: detailedPageResolver,
    },
    loadChildren: () =>
      import('./../detailed-page/detailed-page.module').then(
        m => m.DetailedPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesMain)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
