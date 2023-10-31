import { Component } from '@angular/core';
import { FiltersService } from 'src/app/core/services/filters/filters.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent {
  isDateSort:string;
  isViewSort: string;
  constructor(private readonly filterService: FiltersService) {
    this.isDateSort = 'none';
    this.isViewSort = 'none';
  }
  dateSort() {
    this.isDateSort = this.filterService.setDateSort();
  }
  viewSort() {
    this.isViewSort = this.filterService.setViewSort();
  }
}
