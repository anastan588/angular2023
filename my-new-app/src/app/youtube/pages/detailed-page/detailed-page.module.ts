import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardFooter, MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { DetailedRoutingModule } from './detailed-page-routing.module';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderModule } from '../../components/header.module';
import { DetailedPageComponent } from './detailed-page.component';
import { BordersItemsDirective } from 'src/app/shared/directives/borders-items.directive';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DetailedPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    DetailedRoutingModule,
    MatCardModule,
    BordersItemsDirective,
  ],
  exports: [],
})
export class DetailedPageModule {}
