import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritePageComponent } from './favorite-page.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteRoutingModule } from './favorite-page-routing';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { FavoriteItemComponent } from './favorite-item/favorite-item.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { SortingPipe } from 'src/app/shared/pipes/sorting.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FavoritePageComponent, FavoriteItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    ButtonModule,
    MatCardModule,
    MatIconModule,
    FavoriteRoutingModule,
    SharedModule
  ],
})
export class FavoritePageModule {
  constructor() {
    console.log('favorite');
  }
}
