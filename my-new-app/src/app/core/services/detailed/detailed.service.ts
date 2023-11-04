import { Injectable } from '@angular/core';
import { IVideoItem } from '../../store/models/video-item';

@Injectable({
  providedIn: 'root',
})
export class DetailedService {
  public currentVideo!: IVideoItem;
  constructor() {}

  setCurrentVideo(video: IVideoItem) {
    this.currentVideo = video;
    console.log(this.currentVideo);
    return this.currentVideo;
  }
}
