import { Component, Input } from '@angular/core';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { Router } from '@angular/router';
import { DetailedService } from 'src/app/core/services/detailed/detailed.service';

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
  constructor(private router: Router, private readonly detailedService: DetailedService) {
    this.dataPublication;
    this.timePublication;
    this.todayDate = new Date();
    this.colorOfFooter = {};
  }

 navigateToDetailedPage() {
  this.detailedService.setCurrentVideo(this.video);
  // this.router.navigate(['detailed', this.video.id]);
 }
}
