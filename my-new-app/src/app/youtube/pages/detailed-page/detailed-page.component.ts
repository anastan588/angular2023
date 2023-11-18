import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IVideoItem } from 'src/app/core/store/models/video-item';


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
    private _routes: ActivatedRoute
  ) {
    this.videoId = String(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this._routes.data.subscribe(({video}) => {
      this.videoForShow = video;
    })
  }
}
