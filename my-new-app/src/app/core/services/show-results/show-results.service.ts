import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowResultsService {
  public showResults: boolean = false;
  constructor() { }
  public setShowResults(state:boolean){
    this.showResults = state;
    console.log(this.showResults)
    return this.showResults;
 }
}
