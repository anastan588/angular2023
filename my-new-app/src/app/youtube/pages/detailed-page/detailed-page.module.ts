import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { DetailedRoutingModule } from './detailed-page-routing.module';
import { DetailedPageComponent } from './detailed-page.component';
import { BordersItemsDirective } from 'src/app/shared/directives/borders-items.directive';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [DetailedPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    DetailedRoutingModule,
    MatCardModule,
    BordersItemsDirective,
    ButtonModule,
  ],
  exports: [DetailedPageComponent],
})
export class DetailedPageModule {}
