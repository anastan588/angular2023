import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from './shared/shared.module';
import { ButtonComponent } from './shared/components/button/button.component';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { SignupService } from './core/services/signup/signup.service';
import { SigninService } from './core/services/signin/signin.service';
import { MainComponent } from './milestone/pages/main/main.component';
import { AuthService } from './core/services/auth/auth.service';
import { ProfileService } from './core/services/profile/profile.service';


@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    SharedModule,
    MaterialModule,
    ButtonComponent,
    HttpClientModule,
  ],
  providers: [
    SignupService,
    SigninService,
    AuthService,
    ProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
