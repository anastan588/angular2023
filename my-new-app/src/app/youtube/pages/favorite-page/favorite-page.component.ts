import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { selectfavouriteCollection } from 'src/app/core/store/selectors/selectors';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent implements OnInit {
  searchResults$ = new BehaviorSubject<IVideoItem[]>([]);
  results$!: Observable<IVideoItem[]>;
  results!: Observable<IVideoItem[]>;
  initialArray!: IVideoItem[];
  constructor(
    public router: Router,
    public readonly filterService: FiltersService,
    public readonly api: ApiService,
    private store: Store
  ) {
    this.searchResults$.asObservable();
  }

  ngOnInit() {
    this.store.select(selectfavouriteCollection).subscribe(data => {
      this.searchResults$.next(data);
    });
    console.log(this.searchResults$);
    this.results$ = this.searchResults$;
    this.results = this.results$;
    console.log(this.results);
    // this.searchResults$ = this.api.resultForCustomers$;
    // this.api.resultForCustomers$.subscribe((data: IVideoItem[]) => {
    //   this.initialArray = JSON.parse(JSON.stringify(data));
    // });
  }
}
