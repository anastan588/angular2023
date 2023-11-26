import { Component, DoCheck } from '@angular/core';
import { Store } from '@ngrx/store';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { ShowResultsService } from 'src/app/core/services/show-results/show-results.service';
import { loadvideos, nextPage, previousPage } from 'src/app/core/store/actions/actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements DoCheck {
  isShowMain = false;

  constructor(
    public readonly showResultsService: ShowResultsService,
    private readonly filterService: FiltersService,
    private store: Store,
  ) {}
  ngDoCheck() {
    this.isShowMain = this.showResultsService.showResults.valueOf();
  }

  sortViews(a: string, b: string) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  nextPage() {
    this.store.dispatch(nextPage());
    this.store.dispatch(loadvideos());
  }

  previousPage() {
    this.store.dispatch(previousPage());
    this.store.dispatch(loadvideos());
  }
}
