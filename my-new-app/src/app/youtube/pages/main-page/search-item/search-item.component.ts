import { Component, Input } from '@angular/core';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';

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
  constructor(
    private router: Router,
    private readonly apiService: ApiService
  ) {
    this.dataPublication;
    this.timePublication;
    this.todayDate = new Date();
    this.colorOfFooter = {};
  }

  navigateToDetailedPage() {
    // this.detailedService.setCurrentVideo(this.video);
    // this.apiService.getVideoDetailsFromYouTubeApi(this.video.id);
    this.router.navigate(['main/detailed', this.video.id]);
  }
}
