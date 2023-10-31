import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchItemComponent } from './search-item/search-item.component';


@NgModule({
  declarations: [SearchResultsComponent, SearchItemComponent],
  imports: [BrowserModule, CommonModule, MatCardModule, ButtonModule],
  exports: [SearchResultsComponent],
})
export class MainModule {
}
