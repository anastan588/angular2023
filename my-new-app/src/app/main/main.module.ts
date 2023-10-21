import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchItemComponent } from './search-item/search-item.component';




@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [ SearchResultsComponent,
    SearchItemComponent,
  ]   
})
export class MainModule { }
