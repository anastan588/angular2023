import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { IVideoItem } from '../../store/models/video-item';
import { HttpClient } from '@angular/common/http';
import { ISearchResponse } from '../../store/models/search-response';
import { Store } from '@ngrx/store';
import { FavouriteReceiveVideosActions, FavouriteVideosActions, PageNumberActions } from '../../store/actions/actions';
import {
  PageNumberNextCollection,
  PageNumberPrevoiusCollection,
  searchCollection,
  selectfavouriteCollection,
} from '../../store/selectors/selectors';
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
  videosFavourite$: Observable<IVideoItem[]>;
  videosFavouriteSubject$ = new BehaviorSubject<IVideoItem[]>([]);

  pageNumberNext$: string = '';
  pageNumberPrevious$: string = '';
  nextOrPreviosIndentifier = new BehaviorSubject<string>('');
  nextOrPrevous: string = '';
  page!: string;

  constructor(
    public http: HttpClient,
    private store: Store<{ videos: IVideoItem[] }>,
    private storePageNumber: Store
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
    this.videosFavourite$ = this.videosFavouriteSubject$.asObservable();
    this.videos$ = store.select('videos');
    storePageNumber.select(selectfavouriteCollection).subscribe(fav => {
      this.videosFavouriteSubject$.next(fav);
    });
    storePageNumber.select(PageNumberNextCollection).subscribe(page => {
      this.pageNumberNext$ = page.valueOf();
    });
    storePageNumber.select(PageNumberPrevoiusCollection).subscribe(page => {
      this.pageNumberPrevious$ = page.valueOf();
    });
    this.nextOrPreviosIndentifier.subscribe(
      identifier => (this.nextOrPrevous = identifier)
    );
  }

  public changeSearchWord(word: string) {
    return this.searchWord$.next(word);
  }
  receiveUtlForVideoList() {
    console.log(this.pageNumberNext$);
    console.log(this.pageNumberPrevious$);
    console.log(this.nextOrPrevous);
    if (this.nextOrPrevous === 'next') {
      this.page = this.pageNumberNext$;
    } else if (this.nextOrPrevous === 'prev') {
      this.page = this.pageNumberPrevious$;
    }
    if (this.page !== undefined) {
      console.log(this.page);
      return `search?pageToken=${this.page}&type=video&maxResults=20&q=${this.searchString}`;
    }
    return `search?&type=video&maxResults=20&q=${this.searchString}`;
  }
  receiveUtlForVideoItem() {
    return `videos?&part=snippet,statistics&id=${this.videoId}`;
  }

  getVideos() {
    console.log(this.page);
    this.urlForVideoList = this.receiveUtlForVideoList();
    return this.http.get<ISearchResponse>(this.urlForVideoList).pipe(
      switchMap((response: ISearchResponse) => {
        console.log(response);
        console.log(response.nextPageToken);
        console.log(response.prevPageToken);
        if (response.nextPageToken !== undefined) {
          this.storePageNumber.dispatch(
            PageNumberActions.nextPage({ pageToken: response.nextPageToken })
          );
        }
        if (response.prevPageToken !== undefined) {
          this.storePageNumber.dispatch(
            PageNumberActions.prevousPage({
              pageToken: response.prevPageToken,
            })
          );
        }
        this.storePageNumber.dispatch(FavouriteVideosActions.resetFavourite())
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
