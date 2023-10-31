import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './pages/main-page/footer/footer.component';
import { HeaderModule } from './pages/main-page/header/header.module';
import { MainModule } from './/pages/main-page/main/main.module';
import { HeaderComponent } from './/pages/main-page/header/header.component';
import { MainComponent } from './pages/main-page/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OpenFilterMenuService } from './core/services/open-filter/open-filter-menu.service';
import { ShowResultsService } from './core/services/show-results/show-results.service';
import { FiltersService } from './core/services/filters/filters.service';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    MainModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [OpenFilterMenuService, ShowResultsService, FiltersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
