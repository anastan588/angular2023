import { Component, Input } from '@angular/core';
import { IVideoItem } from 'src/app/core/store/models/video-item';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input()
  video!: IVideoItem;
  dataPublication!: Date;
  timePublication!: number;
  todayDate: Date;
  colorOfFooter: Record<string, string> = {};
  constructor() {
    this.dataPublication;
    this.timePublication;
    this.todayDate = new Date();
    this.colorOfFooter = {};
  }

  setColorOfFooter() {
    this.dataPublication = new Date(this.video.snippet.publishedAt);
    this.timePublication =
      this.todayDate.getTime() - this.dataPublication.getTime();
    const days = this.timePublication / (1000 * 60 * 60 * 24);
    if (days > 180) {
      return { 'background-color': '#cf222e' };
    } else if (days <= 180 && days > 30) {
      return { 'background-color': '#d4a72c' };
    } else if (days <= 30 && days >= 7) {
      return { 'background-color': '#2da44e' };
    } else if (days <= 7 && days >= 0) {
      return { 'background-color': '#218bff' };
    }
    return { 'background-color': '#cf222e' };
  }
}
