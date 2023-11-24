import { Component, DoCheck, OnInit } from '@angular/core';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { searchCollection } from 'src/app/core/selectors/selectors';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  searchResults$!: Observable<IVideoItem[]>;
  initialArray!: IVideoItem[];
  isDateSort!: string;
  isViewSort!: string;
  wordFilter = '';

  constructor(
    public readonly filterService: FiltersService,
    public readonly api: ApiService,
    public store: Store
  ) {
   
  }
  ngOnInit() {
    // this.searchResults$ = this.api.resultForCustomers$;
    this.searchResults$ = this.store.select(searchCollection);
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
