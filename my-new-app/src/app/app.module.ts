import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpenFilterMenuService } from './core/services/open-filter/open-filter-menu.service';
import { ShowResultsService } from './core/services/show-results/show-results.service';
import { FiltersService } from './core/services/filters/filters.service';
import { RouterModule, provideRouter } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './core/services/api/api.service';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { StoreModule } from '@ngrx/store';
import {
  youTubeReducer,
} from './core/store/youtube/youtube.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { VideoEffects } from './core/store/youtube/youtube.effect';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { SortingPipe } from './shared/pipes/sorting.pipe';
import { FavoriteService } from './core/services/favorite/favorite.service';
import { SlicePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({
      videos: youTubeReducer,
      favoiriteCollection: youTubeReducer,
      pageNext: youTubeReducer,
      pagePrevious: youTubeReducer,
      // detailedVideo: tubeVideosReducer,
      custom: youTubeReducer,
      pageItems: youTubeReducer,

    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([VideoEffects]),
  ],
  exports: [],
  providers: [
    OpenFilterMenuService,
    ShowResultsService,
    FiltersService,
    FilterPipe,
    SortingPipe,
    MatIconRegistry,
    ApiService,
    FavoriteService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.log('app');
  }
}
