import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OpenFilterMenuService {
  public openFilterMenu: boolean = false;
  constructor() { }
  public setOpenFilterMenu(state:boolean){
    if (localStorage.getItem('login')) {
     this.openFilterMenu = state;
    console.log(this.openFilterMenu)
    return this.openFilterMenu; 
    }
   return;
 }
}
