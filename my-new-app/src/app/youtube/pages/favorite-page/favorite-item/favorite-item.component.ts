import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiService } from './../../../../core/services/api/api.service';
import { addFavoriteVideo, removeFavoriteVideo } from './../../../../core/store/youtube/youtube.actions';
import { IVideoItem } from './../../../../core/data/models/video-item';
import { FilterPipe } from './../../../../shared/pipes/filter.pipe';


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
    this.selectedChange.emit(this.selected);
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
  
  }
}
