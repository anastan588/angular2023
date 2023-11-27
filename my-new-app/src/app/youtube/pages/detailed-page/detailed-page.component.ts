import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomVideosActions} from 'src/app/core/store/youtube/youtube.actions';
import { IVideoItem } from 'src/app/core/data/models/video-item';
import { selectCurrentVideo } from 'src/app/core/store/youtube/youtube.selectors';


@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss'],
})
export class DetailedPageComponent {
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
    console.log(this.videoId);

    this._routes.data.subscribe(({ video }) => {
      this.videoForShow = video;
    });
    console.log(this.videoId);
    console.log(this.videoId.match(/\d/));
    if (this.videoId.match(/^\d$/)) {
      this.store
        .select(selectCurrentVideo)
        .subscribe(video => (this.videoForShow = video));
    }
  }

  deleteCustomCard() {
    this.store.dispatch(
      CustomVideosActions.removeVideo({ video: this.videoForShow })
    );
    this.router.navigate(['main']);
  }
}
