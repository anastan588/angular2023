import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { UserComponent } from './user/user.component';
import { SortingComponent } from './sorting/sorting.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    SearchInputComponent,
    UserComponent,
    SortingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatInputModule, 
    MatButtonModule,
    MatIconModule
  ],
  exports: [ SearchInputComponent,
    UserComponent,
    SortingComponent]   
})
export class HeaderModule { }
