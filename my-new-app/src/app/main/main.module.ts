import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchItemComponent } from './search-item/search-item.component';



@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
