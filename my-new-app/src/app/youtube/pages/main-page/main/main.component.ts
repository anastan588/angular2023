import { Component, DoCheck } from '@angular/core';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { ShowResultsService } from 'src/app/core/services/show-results/show-results.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements DoCheck{
  isShowMain = false;

  constructor(public readonly showResultsService: ShowResultsService, private readonly filterService: FiltersService) {
  }
  ngDoCheck() {
      this.isShowMain = this.showResultsService.showResults.valueOf();
    };

  sortViews(a: string, b: string) {
      if (a < b) {
          return -1;
      }
      if (a > b) {
          return 1;
      }
      return 0;
  }
}
