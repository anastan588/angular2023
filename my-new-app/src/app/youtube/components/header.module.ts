import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './header/search-input/search-input.component';
import { UserComponent } from './header/user/user.component';
import { SortingComponent } from './header/sorting/sorting.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { OpenFilterMenuService } from 'src/app/core/services/open-filter/open-filter-menu.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@NgModule({
  declarations: [
    SearchInputComponent,
    UserComponent,
    SortingComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    MatToolbarModule,
    ButtonModule,
    InputComponent,
  ],
  exports: [
    SearchInputComponent,
    UserComponent,
    SortingComponent,
    HeaderComponent,
  ],
  providers: [OpenFilterMenuService],
})
export class HeaderModule {}
