import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { addFavoriteVideo, removeFavoriteVideo } from 'src/app/core/store/youtube/youtube.actions';
import { IVideoItem } from 'src/app/core/data/models/video-item';
import { selectfavouriteCollection } from 'src/app/core/store/youtube/youtube.selectors';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';


@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss'],
})
export class FavoriteItemComponent {
  @Input() selected!: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  @Input() video!: IVideoItem;
  dataPublication!: Date;
  timePublication!: number;
  todayDate: Date;
  colorOfFooter: Record<string, string> = {};
  initialArray!: IVideoItem[];
  constructor(
    public router: Router,
    public readonly filterService: FilterPipe,
    public readonly api: ApiService,
    private store: Store
  ) {
    this.dataPublication;
    this.timePublication;
    this.todayDate = new Date();
    this.colorOfFooter = {};
    this.selected = true;
  }

  navigateToDetailedPage() {
    console.log(this.video.id);
    this.router.navigate(['main/detailed', this.video.id]);
  }

  public toggleSelected() {
    this.selected = !this.selected;
    console.log(this.selected);
    this.selectedChange.emit(this.selected);
    console.log(this.video.id);
    const ID = this.video.id;
    if (this.selected === true) {
      this.store.dispatch(
        addFavoriteVideo({ videoId: `${ID}` })
      );
    } else {
      this.store.dispatch(
        removeFavoriteVideo({
          videoId: `${ID}`,
        })
      );
    }
  }

  ngOnInit() {
    // this.searchResults$ = this.api.resultForCustomers$;
    // this.api.resultForCustomers$.subscribe((data: IVideoItem[]) => {
    //   this.initialArray = JSON.parse(JSON.stringify(data));
    // });
  }
}
