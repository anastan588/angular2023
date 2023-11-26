import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { IVideoItem } from '../store/models/video-item';
import { filter } from 'rxjs';

export const detailedPageResolver: ResolveFn<IVideoItem> = (route, state) => {
  console.log(route.paramMap.get('id'));
  console.log(state);
  return inject(ApiService).getVideoDetailsFromYouTubeApi(
    route.paramMap.get('id')!
  );
};
