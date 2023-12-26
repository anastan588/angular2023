import {
  Component,
  OnInit,
} from '@angular/core';
import { IVideoItem } from './../../../../core/data/models/video-item';
import { FiltersService } from './../../../../core/services/filters/filters.service';
import { ApiService } from './../../../../../app/core/services/api/api.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { PanginationService } from './../../../../core/services/pangination.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  searchResultsObject$ = new BehaviorSubject<IVideoItem[]>([]);
  searchResults$!: Observable<IVideoItem[]>;
  initialArray!: IVideoItem[];
  isDateSort!: string;
  isViewSort!: string;
  wordFilter = '';
  startPaginationPosition: number = 0;
  endPaginationPosition: number = 20;

  constructor(
    public readonly filterService: FiltersService,
    public readonly api: ApiService,
    public readonly pagination: PanginationService,
    private store: Store<{ videos: IVideoItem[] }>
  ) {}
  ngOnInit() {
    this.searchResultsObject$.asObservable();
    this.searchResults$ = this.searchResultsObject$;
    this.filterService.keyWord$.subscribe((word: string) => {
      this.wordFilter = word;
    });
    this.filterService.dateSort$.subscribe((sort: string) => {
      this.isDateSort = sort;
    });
    this.filterService.viewSort$.subscribe((sort: string) => {
      this.isViewSort = sort;
    });

    this.pagination.startPositionObject$.subscribe(value => {
      this.startPaginationPosition = value;
    });
    this.pagination.endPositionObject$.subscribe(value => {
      this.endPaginationPosition = value;
      this.api.resultForCustomers$
        .pipe(
          map(array => {
            const arrayForShow = array.slice(
              this.startPaginationPosition,
              this.endPaginationPosition
            );
            return arrayForShow;
          })
        )
        .subscribe(value => {
          this.searchResultsObject$.next(value);
          this.initialArray = JSON.parse(JSON.stringify(value));
        });
    });
  }
}
