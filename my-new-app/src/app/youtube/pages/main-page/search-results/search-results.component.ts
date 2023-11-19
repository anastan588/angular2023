import { Component, DoCheck, OnInit } from '@angular/core';
import information from './../../../../core/store/data/response.json';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Observable } from 'rxjs';

console.log(information);
console.log(information.items);
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
    public readonly api: ApiService
  ) {
    // this.searchResults = this.filterService.arrayResults;
    // this.filterService.myMethod(this.searchResults);
    // console.log(this.searchResults);
  }
  ngOnInit() {
    this.searchResults$ = this.api.resultForCustomers$;
    console.log(this.searchResults$);
    this.filterService.keyWord$.subscribe((word: string) => {
      this.wordFilter = word;
    });
    this.filterService.dateSort$.subscribe((sort: string) => {
      this.isDateSort = sort;
      console.log(this.isDateSort);
    });
    this.filterService.viewSort$.subscribe((sort: string) => {
      this.isViewSort = sort;
      console.log(this.isViewSort);
    });
    this.filterService.initialArrayResults$.subscribe((data: IVideoItem[]) => {
      this.initialArrayResults = data;
      console.log(this.initialArrayResults);
    });
  }

  ngDoCheck() {
    // this.isDateSort = this.filterService.dateSort.valueOf();
    // this.isViewSort = this.filterService.viewSort.valueOf();
    // console.log(this.searchResults[0].snippet.title);
    // this.searchResults = this.filterService.arrayResults;
    // console.log(this.searchResults);
    // console.log(this.searchResults[0].snippet.title);
  }
}
