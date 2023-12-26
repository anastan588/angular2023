import { Component } from '@angular/core';
import { FiltersService } from './../../../../core/services/filters/filters.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent {
  isDateSort: string;
  isViewSort: string;
  isWord: string;
  
  constructor(private readonly filterService: FiltersService) {
    this.isDateSort = 'none';
    this.isViewSort = 'none';
    this.isWord = ''; 
  }
  
  changeKeyWord() {
    this.filterService.changeKeyWord(this.isWord);
  }
  
  dateSort() {
    this.filterService.setDateSort();
  }
  viewSort() {
    this.filterService.setViewSort();
  }
}
