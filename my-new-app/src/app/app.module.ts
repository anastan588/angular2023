import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpenFilterMenuService } from './core/services/open-filter/open-filter-menu.service';
import { ShowResultsService } from './core/services/show-results/show-results.service';
import { FiltersService } from './core/services/filters/filters.service';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './core/services/api/api.service';
import { ApiInterceptor } from './core/interceptors/api.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    AuthModule,
    HttpClientModule,
  ],
  providers: [
    OpenFilterMenuService,
    ShowResultsService,
    FiltersService,
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.log('app');
  }
}
