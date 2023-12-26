import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { ApiService } from './../../../core/services/api/api.service';
import { FiltersService } from './../../../core/services/filters/filters.service';
import { IVideoItem } from './../../../core/data/models/video-item';
import { FavoriteService } from './../../../core/services/favorite/favorite.service';

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
    private _routes: ActivatedRoute,
    public readonly favoriteService: FavoriteService,
  ) {
  }

  ngOnInit() {
    this.searchResults$ = this.api.videosFavourite$;
    console.log(this.searchResults$);
    this.favoriteService.canRouteToFavoritePage$.subscribe((data)=>{
      console.log(data)
    });
  }
}
