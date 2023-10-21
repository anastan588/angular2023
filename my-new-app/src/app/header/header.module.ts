import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { UserComponent } from './user/user.component';
import { SortingComponent } from './sorting/sorting.component';



@NgModule({
  declarations: [
    SearchInputComponent,
    UserComponent,
    SortingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HeaderModule { }
