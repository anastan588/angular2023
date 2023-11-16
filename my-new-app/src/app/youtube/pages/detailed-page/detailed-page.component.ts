import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
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
  constructor(
    private readonly apiService: ApiService
  ) {
    this.videoId = String(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.apiService.currentVideo$.subscribe(data => {
      this.videoForShow = data;
    });
  }
}
