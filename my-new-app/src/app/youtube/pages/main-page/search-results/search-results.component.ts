import {
  Component,
  DoCheck,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IVideoItem } from 'src/app/core/data/models/video-item';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { PanginationService } from 'src/app/core/services/pangination.service';

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
  ) {
    
  }
  ngOnInit() {
    this.searchResultsObject$.asObservable();
    this.api.resultForCustomers$.subscribe(value => {
      this.searchResultsObject$.next(value);
    });
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
    this.pagination.startPositionObject$.subscribe(value => {
      this.startPaginationPosition = value;
    });
    this.pagination.endPositionObject$.subscribe(value => {
      this.endPaginationPosition = value;
      console.log(value);
      console.log(this.endPaginationPosition);
      this.api.resultForCustomers$
        .pipe(
          map(array => {
            const arrayForShow = array.slice(
              this.startPaginationPosition,
              this.endPaginationPosition
            );
            console.log(arrayForShow);
            return arrayForShow;
          })
        ).subscribe((value=>{
          this.searchResultsObject$.next(value); 
          console.log( this.searchResultsObject$);
          console.log( this.searchResults$);
        }))
       
    });
  }

}
