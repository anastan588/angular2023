import { Component, DoCheck, OnInit } from '@angular/core';
import information from './../../../../core/store/data/response.json';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { ApiService } from 'src/app/core/services/api/api.service';

console.log(information);
console.log(information.items);
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  searchResults: IVideoItem[] | undefined;
  isDateSort = 'none';
  isViewSort = 'none';
  wordFilter = 'angular';

  constructor(
    public readonly filterService: FiltersService,
    public readonly api: ApiService
  ) {
    // this.searchResults = this.filterService.arrayResults;
    // this.filterService.myMethod(this.searchResults);
    // console.log(this.searchResults);
  }
  ngOnInit() {
    return this.api.resultForCustomers$.subscribe(data => {
      this.searchResults = data;
    });
  }

  ngDoCheck() {
    this.isDateSort = this.filterService.dateSort.valueOf();
    this.isViewSort = this.filterService.viewSort.valueOf();

    // console.log(this.searchResults[0].snippet.title);
    // this.searchResults = this.filterService.arrayResults;
    // console.log(this.searchResults);
    // console.log(this.searchResults[0].snippet.title);
    this.filterService.keyWord$.subscribe((word: string) => {
      this.wordFilter = word;
    });
  }
}
