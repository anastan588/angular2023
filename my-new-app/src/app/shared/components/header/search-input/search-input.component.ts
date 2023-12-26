import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, filter, map } from 'rxjs';
import { ApiService } from './../../../../core/services/api/api.service';
import { OpenFilterMenuService } from './../../../../core/services/open-filter/open-filter-menu.service';
import { ShowResultsService } from './../../../../core/services/show-results/show-results.service';
import {
  loadVideos,
} from './../../../../core/store/youtube/youtube.actions';
import { IVideoItem } from './../../../../core/data/models/video-item';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  open: boolean;
  results: true;
  event!: Event;
  isSearchWord: string;
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 500;

  constructor(
    private readonly openFilterMenuService: OpenFilterMenuService,
    private readonly showResultsService: ShowResultsService,
    private readonly apiService: ApiService,
    private router: Router,
    private store: Store<{ videos: IVideoItem[] }>
  ) {
    this.open = true;
    this.results = true;
    this.isSearchWord = '';
  }
  toggleSorting() {
    this.openFilterMenuService.setOpenFilterMenu(this.open);
    this.open = !this.open;
  }
  ngOnInit() {
    this.searchSubject
      .pipe(
        map((value: string) => value.trim()),
        filter((value: string) => value.length >= 3),
        debounceTime(this.debounceTimeMs)
      )
      .subscribe(() => {
        this.changeSearchWord();
        this.showResults();
      });
  }
  onSearch() {
    this.searchSubject.next(this.isSearchWord);
  }
  showResults() {
    this.router.navigate(['main']);
    this.store.dispatch(loadVideos());
    // this.apiService.getVideos();
  }
  changeSearchWord() {
    console.log(this.isSearchWord);
    this.apiService.changeSearchWord(this.isSearchWord);
  }
}
