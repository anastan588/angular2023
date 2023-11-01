import { Component, DoCheck } from '@angular/core';
import information from './../../../../core/store/data/response.json';
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
  }
  ngDoCheck() {
    this.isDateSort = this.filterService.dateSort.valueOf();
    this.isViewSort = this.filterService.viewSort.valueOf();
    this.searchResults = this.filterService.arrayResults;
    this.filterService.keyWord$.subscribe((word:string) => {
      this.wordFilter = word;
       console.log(this.wordFilter);
    }); 
  };
}
