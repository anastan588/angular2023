import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { IVideoItem } from '../../data/models/video-item';
import { HttpClient } from '@angular/common/http';
import { ISearchResponse } from '../../data/models/search-response';
import { Store } from '@ngrx/store';
import {
  FavouriteVideosActions,
  PageNumberActions,
} from '../../store/youtube/youtube.actions';
import {
  PageNumberNextCollection,
  PageNumberPrevoiusCollection,
  customCollection,
  pageItemsNumber,
  searchCollection,
  selectfavouriteCollection,
} from '../../store/youtube/youtube.selectors';

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
  itemsForRequest$ = 20;

  constructor(
    public http: HttpClient,
    private storeVideos: Store<{ videos: IVideoItem[] }>,
    private store: Store
  ) {
    this.resultForCustomers$ = this.myRequestResultObject.asObservable();
    this.store.select(searchCollection).subscribe(videos => {
      this.store.select(customCollection).subscribe(customs => {
        this.myRequestResultObject.next(customs.concat(videos));
        this.itemsForRequest$ = 20 - customs.length;
        this.store.dispatch(
          PageNumberActions.numberItems({
            pageItems: this.itemsForRequest$!,
          })
        );
      });
    });
    this.videoId = '';
    this.searchString = '';
    this.urlForVideoList = ``;
    this.urlForVideoItem = ``;
    this.searchWord$.subscribe(data => {
      this.searchString = data;
    });
    this.videosFavourite$ = this.videosFavouriteSubject$.asObservable();

    this.videos$ = storeVideos.select('videos');
    store.select(selectfavouriteCollection).subscribe(fav => {
      this.videosFavouriteSubject$.next(fav);
    });
    store.select(PageNumberNextCollection).subscribe(page => {
      this.pageNumberNext$ = page.valueOf();
    });
    store.select(PageNumberPrevoiusCollection).subscribe(page => {
      this.pageNumberPrevious$ = page.valueOf();
    });
    store.select(pageItemsNumber).subscribe(numbeOfItems => {
      this.itemsForRequest$ = numbeOfItems;
    });
    this.nextOrPreviosIndentifier.subscribe(
      identifier => (this.nextOrPrevous = identifier)
    );
  }

  public changeSearchWord(word: string) {
    return this.searchWord$.next(word);
  }
  receiveUtlForVideoList() {
    if (this.nextOrPrevous === 'next') {
      this.page = this.pageNumberNext$;
    } else if (this.nextOrPrevous === 'prev') {
      this.page = this.pageNumberPrevious$;
    }
    if (this.page !== undefined) {
      console.log(this.page);
      return `search?pageToken=${this.page}&type=video&maxResults=${this.itemsForRequest$}&q=${this.searchString}`;
    }
    return `search?&type=video&maxResults=20&q=${this.searchString}`;
  }
  receiveUtlForVideoItem() {
    return `videos?&part=snippet,statistics&id=${this.videoId}`;
  }

  getVideos() {
    console.log(this.itemsForRequest$);
    this.urlForVideoList = this.receiveUtlForVideoList();
    return this.http.get<ISearchResponse>(this.urlForVideoList).pipe(
      switchMap((response: ISearchResponse) => {
        if (response.nextPageToken !== undefined) {
          this.store.dispatch(
            PageNumberActions.nextPage({ pageToken: response.nextPageToken })
          );
        }
        if (response.prevPageToken !== undefined) {
          this.store.dispatch(
            PageNumberActions.prevousPage({
              pageToken: response.prevPageToken,
            })
          );
        }
        this.store.dispatch(FavouriteVideosActions.resetFavourite());
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
