import { Injectable } from '@angular/core';
import information from './../../../core/store/data/response.json';
import { IVideoItem } from '../../store/models/video-item';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public dateSort: string = 'none';
  public dateSortCounter: number = 0;
  public viewSort: string = 'none';
  public viewSortCounter: number = 0;
  public arrayResults: IVideoItem[] = information.items;
  public initialArrayResults: IVideoItem[] = JSON.parse(
    JSON.stringify(information.items)
  );
  myArray$: Observable<IVideoItem[]>;
  private myArraySubject = new Subject<IVideoItem[]>();
  
  public keyWord$ = new Subject<string>();
  constructor() {
    this.myArray$ = this.myArraySubject.asObservable();
  }
myMethod(data:IVideoItem[]) {
    console.log(data); 
    this.myArraySubject.next(data);
}

onDoCheck() {
  this.myArraySubject.subscribe((myArray:IVideoItem[]) => {
    this.arrayResults = JSON.parse(
      JSON.stringify(myArray)
    );;
    this.initialArrayResults = JSON.parse(
      JSON.stringify(myArray)
    );;

  });
}

  public changeKeyWord(word: string) {
    this.keyWord$.next(word);
  }

  public setDateSort() {
    if (this.dateSortCounter !== 2) {
      this.dateSortCounter += 1;
    } else {
      this.dateSortCounter = 0;
    }
    if (this.dateSortCounter === 0) {
      this.dateSort = 'none';
    } else if (this.dateSortCounter === 1) {
      this.dateSort = 'ascending';
    } else if (this.dateSortCounter === 2) {
      this.dateSort = 'descending';
    }
    this.sortArrayDateResults();
    return this.dateSort;
  }

  public setViewSort() {
    if (this.viewSortCounter !== 2) {
      this.viewSortCounter += 1;
    } else {
      this.viewSortCounter = 0;
    }
    console.log(this.viewSortCounter);
    if (this.viewSortCounter === 0) {
      this.viewSort = 'none';
    } else if (this.viewSortCounter === 1) {
      this.viewSort = 'ascending';
    } else if (this.viewSortCounter === 2) {
      this.viewSort = 'descending';
    }
    this.sortArrayViewsResults();
    return this.viewSort;
  }

  sortArrayDateResults() {
    console.log(this.arrayResults[0].snippet.title);
    console.log(this.dateSort);
    if (this.dateSort !== 'none') {
      this.arrayResults.sort((first: IVideoItem, second: IVideoItem) => {
        const firstDate = Date.parse(first.snippet.publishedAt);
        const secondDate = Date.parse(second.snippet.publishedAt);
        return this.sortArray(firstDate, secondDate, this.dateSort);
      });
    } else {
      this.arrayResults = JSON.parse(JSON.stringify(this.initialArrayResults));
    }
    console.log(this.arrayResults);
    return this.arrayResults;
  }

  sortArrayViewsResults() {
    if (this.viewSort !== 'none') {
      this.arrayResults.sort((first: IVideoItem, second: IVideoItem) => {
        const firstView = Number(first.statistics.viewCount);
        const secondView = Number(second.statistics.viewCount);
        return this.sortArray(firstView, secondView, this.viewSort);
      });
    } else {
      return this.arrayResults = JSON.parse(JSON.stringify(this.initialArrayResults));
    }
    return this.arrayResults;
  }

  sortArray(a: number, b: number, state: string) {
    if (state === 'ascending') {
      return a - b;
    } else {
      return b - a;
    }
  }
}
