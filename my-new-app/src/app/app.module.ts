import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpenFilterMenuService } from './core/services/open-filter/open-filter-menu.service';
import { ShowResultsService } from './core/services/show-results/show-results.service';
import { FiltersService } from './core/services/filters/filters.service';
import { RouterModule } from '@angular/router';
import { YoutubeModule } from './youtube/youtube.module';
import { AuthModule } from './auth/auth.module';
import { HeaderModule } from './youtube/components/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { YoutubeComponent } from './youtube/youtube.component';
import { DetailedPageModule } from './youtube/pages/detailed-page/detailed-page.module';
import { NotFoundPageModule } from './youtube/pages/not-found/not-found-page.module';
import { BordersItemsDirective } from './shared/directives/borders-items.directive';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [OpenFilterMenuService, ShowResultsService, FiltersService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.log('app');
  }
}
