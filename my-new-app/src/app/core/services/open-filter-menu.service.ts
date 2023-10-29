import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenFilterMenuService {
  public openFilterMenu: boolean = false;
  constructor() { }
  public toggleSorting(): boolean {
    console.log(this.openFilterMenu)
    return this.openFilterMenu = !this.openFilterMenu; 
 }
}
