import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from 'src/app/youtube/pages/login-page/login-page.component';
import { SearchItemComponent } from './search-item/search-item.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';
import { BordersItemsDirective } from 'src/app/shared/directives/borders-items.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { SortingPipe } from 'src/app/shared/pipes/sorting.pipe';

@NgModule({
  declarations: [
    SearchItemComponent,
    FilterPipe,
    SearchResultsComponent,
    MainComponent,
    SortingPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    ButtonModule,
    MainRoutingModule,
    RouterModule,
    BordersItemsDirective,
  ],
  exports: [SearchItemComponent],
})
export class MainModule {
  constructor() {
    console.log('main');
  }
}
