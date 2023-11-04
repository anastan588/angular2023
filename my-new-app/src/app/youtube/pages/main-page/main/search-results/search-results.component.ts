import { Component, DoCheck } from '@angular/core';
import information from './../../../../../core/store/data/response.json';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { FiltersService } from 'src/app/core/services/filters/filters.service';

console.log(information);
console.log(information.items);
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements DoCheck{
  searchResults: IVideoItem[] = information.items;
  isDateSort = 'none';
  isViewSort = 'none';
  wordFilter = 'angular';
  
  constructor(public readonly filterService: FiltersService) {
    // this.searchResults = this.filterService.arrayResults;
    // this.filterService.myMethod(this.searchResults);
    // console.log(this.searchResults);
  }
  ngDoCheck() {
    this.isDateSort = this.filterService.dateSort.valueOf();
    this.isViewSort = this.filterService.viewSort.valueOf();
    // console.log(this.searchResults[0].snippet.title);
    this.searchResults = this.filterService.arrayResults;
    // console.log(this.filterService.arrayResults[0].snippet.title);
    // console.log(this.searchResults[0].snippet.title);
    this.filterService.keyWord$.subscribe((word:string) => {
      this.wordFilter = word;
    }); 
  };
}
