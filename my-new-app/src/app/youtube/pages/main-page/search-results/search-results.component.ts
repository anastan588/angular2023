import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { searchCollection } from 'src/app/core/store/selectors/selectors';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  // @Input() searchResults$: ReadonlyArray<IVideoItem> = [];
  searchResults$!: Observable<IVideoItem[]>;
  initialArray!: IVideoItem[];
  isDateSort!: string;
  isViewSort!: string;
  wordFilter = '';

  constructor(
    public readonly filterService: FiltersService,
    public readonly api: ApiService,
    private store: Store<{ videos: IVideoItem[] }>,
  ) {}
  ngOnInit() {
    this.searchResults$ = this.api.resultForCustomers$;
    console.log(this.searchResults$);
  //  this.store.dispatch({ type: '[Video API] Videos Loaded Success' });
    // console.log(this.searchResults$);
    this.filterService.keyWord$.subscribe((word: string) => {
      this.wordFilter = word;
    });
    this.filterService.dateSort$.subscribe((sort: string) => {
      this.isDateSort = sort;
    });
    this.filterService.viewSort$.subscribe((sort: string) => {
      this.isViewSort = sort;
    });
    this.api.resultForCustomers$.subscribe((data: IVideoItem[]) => {
      this.initialArray = JSON.parse(JSON.stringify(data));
    });
  }
}
