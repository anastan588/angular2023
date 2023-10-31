import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { UserComponent } from './user/user.component';
import { SortingComponent } from './sorting/sorting.component';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { OpenFilterMenuService } from 'src/app/core/services/open-filter/open-filter-menu.service';

@NgModule({
  declarations: [
    SearchInputComponent,
    UserComponent,
    SortingComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatInputModule, 
    MatIconModule,
    MatButtonModule,
    ButtonModule
  ],
  exports: [ SearchInputComponent,
    UserComponent,
    SortingComponent] , 
  providers: [OpenFilterMenuService]

})
export class HeaderModule { }
