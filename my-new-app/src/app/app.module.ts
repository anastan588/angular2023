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


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
  ],
  providers: [OpenFilterMenuService, ShowResultsService, FiltersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
