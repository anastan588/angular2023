import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { IVideoItem } from 'src/app/core/data/models/video-item';
import { selectfavouriteCollection } from 'src/app/core/store/youtube/youtube.selectors';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent implements OnInit {
  searchResults$!: Observable<IVideoItem[]>;
  results$!: Observable<IVideoItem[]>;
  results!: Observable<IVideoItem[]>;
  initialArray!: IVideoItem[];
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(
    public router: Router,
    public readonly filterService: FiltersService,
    public readonly api: ApiService,
    private store: Store,
    private _routes: ActivatedRoute
  ) {
    // this.results$ = this.searchResults$.asObservable();
    // this.store.select(selectfavouriteCollection).subscribe(items => {
    //   this.searchResults$.next(items);
    // });
  }

  ngOnInit() {
    // this.store.select(selectfavouriteCollection).subscribe(data => {
    //   this.searchResults$.next(data);
    // });

    // this.results$ = this.searchResults$;
    // console.log(this.results$);
    this.searchResults$ = this.api.videosFavourite$;
    console.log(this.searchResults$);
    // this.api.resultForCustomers$.subscribe((data: IVideoItem[]) => {
    //   this.initialArray = JSON.parse(JSON.stringify(data));
    // });
  }
}
