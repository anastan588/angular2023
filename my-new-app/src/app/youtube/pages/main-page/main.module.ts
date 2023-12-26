import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { SearchItemComponent } from './search-item/search-item.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';
import { BordersItemsDirective } from 'src/app/shared/directives/borders-items.directive';
import { HeaderModule } from 'src/app/shared/components/header.module';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';



@NgModule({
  declarations: [
    SearchItemComponent,
    SearchResultsComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    ButtonModule,
    MatButtonModule,
    MatIconModule,
    MainRoutingModule,
    RouterModule,
    BordersItemsDirective,
    HeaderModule,
    SharedModule,
    MatPaginatorModule,
  ],
  exports: [SearchItemComponent],
})
export class MainModule {
  constructor() {
    console.log('main');
  }
}
