import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersService } from './services/filters/filters.service';
import { OpenFilterMenuService } from './services/open-filter/open-filter-menu.service';
import { ShowResultsService } from './services/show-results/show-results.service';
import { detailedPageResolver } from './resolvers/detailed-page.resolver';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: []
})
export class CoreModule {}
