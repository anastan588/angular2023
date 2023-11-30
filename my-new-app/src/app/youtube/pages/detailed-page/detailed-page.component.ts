import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  addFavoriteVideo,
  removeCustomVideo,
  removeFavoriteVideo,
} from 'src/app/core/store/youtube/youtube.actions';
import { IVideoItem } from 'src/app/core/data/models/video-item';
import {
  selectCustomVideos,
  selectFavouriteVideos,
} from 'src/app/core/store/youtube/youtube.selectors';

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss'],
})
export class DetailedPageComponent {
  @Input() selected!: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  route: ActivatedRoute = inject(ActivatedRoute);
  videoId: string = '';
  videoForShow!: IVideoItem;
  constructor(
    private _routes: ActivatedRoute,
    private store: Store,
    public router: Router
  ) {
    this.videoId = String(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    // console.log(this.videoId);
    this._routes.data.subscribe(({ video }) => {
      this.videoForShow = video;
    });
    // console.log(this.videoId);
    // console.log(this.videoId.match(/\d/));
    if (this.videoId.match(/^\d$/)) {
      this.store.select(selectCustomVideos).subscribe(customVideos => {
        this.videoForShow = customVideos.filter(video => {
          const videoSelect = String(video.id.videoId);
          return videoSelect === this.videoId;
        })[0];
      });
    }

    this.store.select(selectFavouriteVideos).subscribe(data => {
      const isFavourite = data.find(item => {
        const ID = JSON.parse(JSON.stringify(this.videoId));
        return item === ID;
      });
      console.log(isFavourite);
      if (isFavourite !== undefined) {
        this.selected = true;
      }
    });
  }

  deleteCustomCard() {
    this.store.dispatch(removeCustomVideo({ video: this.videoForShow }));
    this.router.navigate(['main']);
  }

  public toggleSelected() {
    this.selected = !this.selected;
    console.log(this.selected);
    this.selectedChange.emit(this.selected);
    console.log(this.videoId);
    const ID = this.videoId;
    if (this.selected === true) {
      this.store.dispatch(addFavoriteVideo({ videoId: `${ID}` }));
    } else {
      this.store.dispatch(
        removeFavoriteVideo({
          videoId: `${ID}`,
        })
      );
    }
  }
}
