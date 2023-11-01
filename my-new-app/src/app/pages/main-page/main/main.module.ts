import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchItemComponent } from './search-item/search-item.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SearchResultsComponent, SearchItemComponent, FilterPipe],
  imports: [BrowserModule, CommonModule, MatCardModule, ButtonModule, FormsModule],
  exports: [SearchResultsComponent],
})
export class MainModule {
}
