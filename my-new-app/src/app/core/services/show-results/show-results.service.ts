import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShowResultsService {
  public _showResults: boolean = false;
  constructor() {}
  get showResults(): boolean {
    return this._showResults;
  }

  set showResults(state: boolean) {
    this._showResults = state;
  }
  public setShowResults(state: boolean) {
    this.showResults = state;
    console.log(this.showResults);
    return this.showResults;
  }
}
