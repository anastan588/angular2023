import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedService } from 'src/app/core/services/detailed/detailed.service';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { BordersItemsDirective } from 'src/app/shared/directives/borders-items.directive';

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss'],
})
export class DetailedPageComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  videoId: string = '';
  videoForShow!: IVideoItem;
  constructor(private readonly detailedService: DetailedService) {
    this.videoId = String(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.videoForShow = JSON.parse(
      JSON.stringify(this.detailedService.currentVideo)
    );
    console.log(this.videoForShow);
  }
}
