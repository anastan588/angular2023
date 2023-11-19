import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public dateSort$ = new BehaviorSubject<string>('none');
  public dateSortCounter: number = 0;
  public viewSort$ = new BehaviorSubject<string>('none');
  public viewSortCounter: number = 0;

  public keyWord$ = new Subject<string>();

  constructor(public readonly api: ApiService) {}

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
      this.dateSort$.next('none');
    } else if (this.dateSortCounter === 1) {
      this.dateSort$.next('ascending');
    } else if (this.dateSortCounter === 2) {
      this.dateSort$.next('descending');
    }
    return this.dateSort$;
  }

  public setViewSort() {
    if (this.viewSortCounter !== 2) {
      this.viewSortCounter += 1;
    } else {
      this.viewSortCounter = 0;
    }
    if (this.viewSortCounter === 0) {
      this.viewSort$.next('none');
    } else if (this.viewSortCounter === 1) {
      this.viewSort$.next('ascending');
    } else if (this.viewSortCounter === 2) {
      this.viewSort$.next('descending');
    }
    return this.viewSort$;
  }
}
