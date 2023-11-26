import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { SearchItemComponent } from './search-item/search-item.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';
import { BordersItemsDirective } from 'src/app/shared/directives/borders-items.directive';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { HeaderModule } from 'src/app/shared/components/header.module';
import { SortingPipe } from 'src/app/shared/pipes/sorting.pipe';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoritePageComponent } from '../favorite-page/favorite-page.component';
import { FavoriteItemComponent } from '../favorite-page/favorite-item/favorite-item.component';
import { FavoritePageModule } from '../favorite-page/favorite-page.module';

@NgModule({
  declarations: [
    SearchItemComponent,
    SearchResultsComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    ButtonModule,
    MatButtonModule,
    MatIconModule,
    MainRoutingModule,
    RouterModule,
    BordersItemsDirective,
    HeaderModule,
    SharedModule,
  ],
  exports: [SearchItemComponent],
})
export class MainModule {
  constructor() {
    console.log('main');
  }
}
