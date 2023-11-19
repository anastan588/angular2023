import { Injectable } from '@angular/core';
import information from './../../../core/store/data/response.json';
import { IVideoItem } from '../../store/models/video-item';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public dateSort$ = new BehaviorSubject<string>('none');
  public dateSortCounter: number = 0;
  public viewSort$ = new BehaviorSubject<string>('none');
  public viewSortCounter: number = 0;

  public arrayResults$ = new Subject<IVideoItem[]>();


  public itemsArray = new Observable<IVideoItem[]>();


  public initialArrayResults$ = new BehaviorSubject<IVideoItem[]>([]);

  public keyWord$ = new Subject<string>();

  constructor(public readonly api: ApiService) {
    this.arrayResults$.asObservable();
  }

  myMethod(data: IVideoItem[]) {
    console.log(data);
  }

  ngOnInit() {
    return this.api.resultForCustomers$.subscribe(data => {
      console.log(data);
      this.initialArrayResults$.next(JSON.parse(JSON.stringify(data)).items);
      console.log(this.arrayResults$);
      console.log(this.initialArrayResults$);
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
      this.dateSort$.next('none');
    } else if (this.dateSortCounter === 1) {
      this.dateSort$.next('ascending');
    } else if (this.dateSortCounter === 2) {
      this.dateSort$.next('descending');
    }
    console.log(this.dateSort$);
    return this.dateSort$;
  }

  public setViewSort() {
    if (this.viewSortCounter !== 2) {
      this.viewSortCounter += 1;
    } else {
      this.viewSortCounter = 0;
    }
    console.log(this.viewSortCounter);
    if (this.viewSortCounter === 0) {
      this.viewSort$.next('none');
    } else if (this.viewSortCounter === 1) {
      this.viewSort$.next( 'ascending');
    } else if (this.viewSortCounter === 2) {
      this.viewSort$.next('descending');
    }
    console.log(this.viewSort$);
    return this.viewSort$;
  }

 }
