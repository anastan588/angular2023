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
import { Store } from '@ngrx/store';
import { VideosReceiveFromApiActions } from '../../store/actions/actions';
import { searchCollection } from '../../store/selectors/selectors';
import { Actions } from '@ngrx/store-devtools/src/reducer';

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

  videos$: Observable<IVideoItem[]>;

  pageNumber$: Observable<number>;

  constructor(
    public http: HttpClient,
    private store: Store<{ videos: IVideoItem[] }>,
    private storePageNumber: Store<{ page: number }>
  ) {
    this.resultForCustomers$ = this.myRequestResultObject.asObservable();
    this.store.select(searchCollection).subscribe(videos => {
      this.myRequestResultObject.next(videos);
    });
    this.videoId = '';
    this.searchString = '';
    this.urlForVideoList = ``;
    this.urlForVideoItem = ``;
    this.searchWord$.subscribe(data => {
      this.searchString = data;
    });
    this.videos$ = store.select('videos');
    this.pageNumber$ = storePageNumber.select('page');
  }

  public changeSearchWord(word: string) {
    return this.searchWord$.next(word);
  }
  receiveUtlForVideoList() {
    return `search?&type=video&pageToken=${this.pageNumber$}&maxResults=12&q=${this.searchString}`;
  }
  receiveUtlForVideoItem() {
    return `videos?&part=snippet,statistics&id=${this.videoId}`;
  }

  getVideos() {
    this.urlForVideoList = this.receiveUtlForVideoList();
    return this.http.get<ISearchResponse>(this.urlForVideoList).pipe(
      switchMap((response: ISearchResponse) => {
        console.log(response.items);
        this.videoId = response.items
          .map((item: IVideoItem) => {
            return item.id.videoId;
          })
          .join(',');
        this.urlForVideoItem = this.receiveUtlForVideoItem();
        return this.http.get(this.urlForVideoItem);
      })
    );
  }

  // getVideosFromYouTubeApi() {
  //   this.urlForVideoList = this.receiveUtlForVideoList();
  //   return this.http
  //     .get<ISearchResponse>(this.urlForVideoList)
  //     .pipe(
  //       switchMap((response: ISearchResponse) => {
  //         console.log(response.items);
  //         this.videoId = response.items
  //           .map((item: IVideoItem) => {
  //             return item.id.videoId;
  //           })
  //           .join(',');
  //         this.urlForVideoItem = this.receiveUtlForVideoItem();
  //         return this.http.get(this.urlForVideoItem);
  //       })
  //     )
  //     .subscribe(response => {
  //       const myRequestResultArray = JSON.parse(JSON.stringify(response))
  //         .items as IVideoItem[];
  //       this.store.dispatch(
  //         VideosReceiveFromApiActions.receiveVideosList({
  //           videos: myRequestResultArray,
  //         })
  //       );
  //       // this.myRequestResultObject.next(myRequestResultArray);
  //     });
  // }

  getVideoDetailsFromYouTubeApi(id: string) {
    this.videoId = id;
    this.urlForVideoItem = this.receiveUtlForVideoItem();
    this.http.get<ISearchResponse>(this.urlForVideoItem).subscribe(response => {
      this.currentVideo$.next(response.items[0]);
      return response.items[0];
    });
    return this.currentVideo$;
  }
}