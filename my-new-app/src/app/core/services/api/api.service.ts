import { Injectable } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
} from 'rxjs';
import { IVideoItem } from '../../store/models/video-item';
import { HttpClient } from '@angular/common/http';
import { ISearchResponse } from '../../store/models/search-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  myRequestResultArray: IVideoItem[] | undefined;
  resultForCustomers$: Observable<IVideoItem[]>;
  urlForVideoList: string;
  urlForVideoItem: string;
  videoId: string;
  public currentVideo$ = new Subject<IVideoItem>();

  myRequestResultObject = new BehaviorSubject<IVideoItem[]>([]);
  public searchWord$ = new Subject<string>();
  searchString: string;

  constructor(
    public http: HttpClient
  ) {
    this.resultForCustomers$ = this.myRequestResultObject.asObservable();
    this.videoId = '';
    this.searchString = '';
    this.urlForVideoList = ``;
    this.urlForVideoItem = ``;
    this.searchWord$.subscribe(data => {
      this.searchString = data;
    });
  }

  public changeSearchWord(word: string) {
    return this.searchWord$.next(word);
  }
  receiveUtlForVideoList() {
    return `search?&type=video&maxResults=12&q=${this.searchString}`;
  }
  receiveUtlForVideoItem() {
    return `videos?&part=snippet,statistics&id=${this.videoId}`;
  }

  getVideosFromYouTubeApi() {
    console.log(this.searchWord$);
    this.urlForVideoList = this.receiveUtlForVideoList();
    console.log(this.urlForVideoList);
    return this.http
      .get<ISearchResponse>(this.urlForVideoList)
      .pipe(
        switchMap((response: ISearchResponse) => {
          console.log(response);
          this.videoId = response.items
            .map((item: any) => item.id.videoId)
            .join(',');
          console.log(this.videoId);
          this.urlForVideoItem = this.receiveUtlForVideoItem();
          console.log(this.urlForVideoItem);
          return this.http.get(this.urlForVideoItem);
        })
      )
      .subscribe(response => {
        console.log(response);
        const myRequestResultArray = JSON.parse(JSON.stringify(response))
          .items as IVideoItem[];
        console.log(myRequestResultArray);
        this.myRequestResultObject.next(myRequestResultArray);
        console.log(this.resultForCustomers$);
      });
  }

  getVideoDetailsFromYouTubeApi(id: string) {
    this.videoId = id;
    this.urlForVideoItem = this.receiveUtlForVideoItem();
    this.http.get<ISearchResponse>(this.urlForVideoItem).subscribe(response => {
      this.currentVideo$.next(response.items[0]);
      console.log(response.items[0]);
      return response.items[0];
    });
   return this.currentVideo$;
  }
}
