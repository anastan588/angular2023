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

@NgModule({
  declarations: [
    SearchItemComponent,
    SearchResultsComponent,
    MainComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    ButtonModule,
    MainRoutingModule,
    RouterModule,
    BordersItemsDirective,
    HeaderModule,
  ],
  exports: [SearchItemComponent],
})
export class MainModule {
  constructor() {
    console.log('main');
  }
}
