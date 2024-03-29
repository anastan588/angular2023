import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from './../../../core/services/api/api.service';
import { FiltersService } from './../../../core/services/filters/filters.service';
import { PanginationService } from './../../../core/services/pangination.service';
import { ShowResultsService } from './../../../core/services/show-results/show-results.service';
import { loadVideos } from './../../../core/store/youtube/youtube.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isShowMain = false;
  pageEvent!: PageEvent;
  @Input() pageIndex: number = 0;
  @Input() previousPageIndex: number = 0;
  @Input() length!: number;
  @Input() pageSize: number = 20;
  @Input() pageSizeOptions: number[] = [5, 10, 15, 20];
  @Output() page = new EventEmitter<PageEvent>();
  pages: number[] = [];
  start: number = 0;
  end: number = 20;
  constructor(
    public readonly showResultsService: ShowResultsService,
    private readonly filterService: FiltersService,
    private readonly api: ApiService,
    private store: Store,
    private readonly pangination: PanginationService,
  ) {
    // this.api.itemsOnPageObject$.subscribe(number => {
    //   console.log(number);
    //   this.pageSize = number;
    // });
    this.api.itemsOnPageObject$.next(this.pageSize);
  }
  ngOnInit() {
    this.isShowMain = this.showResultsService.showResults.valueOf();
    this.api.resultForCustomers$.subscribe(videos => {
      this.length = videos.length;
      const pageCount = Math.ceil(this.length / this.pageSize);
      console.log(pageCount);
    });

    console.log(this.api.itemsOnPageObject$);

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
    this.api.nextOrPreviosIndentifier.next('next');
    this.store.dispatch(loadVideos());
  }

  previousPage() {
    this.api.nextOrPreviosIndentifier.next('prev');
    this.store.dispatch(loadVideos());
  }
  setItemsOnPage(event: PageEvent) {
    if (this.pageSize !== event.pageSize) {
      this.end = event.pageSize;
    }
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.previousPageIndex = event.previousPageIndex as number;
    if (this.pageIndex > this.previousPageIndex) {
      this.start = this.start + this.pageSize;
      this.end = this.end + this.pageSize;
    } else if (this.pageIndex < this.previousPageIndex) {
      this.start = this.start - this.pageSize;
      this.end = this.end - this.pageSize;
    }
    this.pangination.setStartAndEnd(this.start, this.end);
    
  }
}
