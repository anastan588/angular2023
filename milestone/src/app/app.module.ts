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
import { MilestoneReducer } from './core/store/milestone/milestone.reducers';
import { EffectsModule } from '@ngrx/effects';
import { MileStoneUserEffects } from './core/store/milestone/milestone.user.effect';
import { CoreModule } from './core/core.module';
import { MileStoneGroupsEffects } from './core/store/milestone/milestone.groups.effect';
import { MatIconRegistry } from '@angular/material/icon';
import { GroupItemComponent, PersonItemComponent } from './milestone';
import { MileStartGroupTimerEffects } from './core/store/milestone/milestone.groupsTimer.effect';
import { MilePoeplesEffects } from './core/store/milestone/milestone.peoples.effect';
import { MileStartPeopleTimerEffects } from './core/store/milestone/milestone.peopleTimer.effect';
import { GroupDialogService } from './core/services/group-dialog/group-dialog.service';
import { PeoplesService } from './core/services/peoples/peoples.service';
import { GroupsService } from './core/services/groups/groups.service';
import { MileStoneGroupMessagesEffects } from './core/store/milestone/milestone.groupMessages.effect ';
import { MileStartGroupMessagesTimerEffects } from './core/store/milestone/milestone.groupMesaggesTimer.effect';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GroupItemComponent,
    PersonItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ MILESTONE: MilestoneReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    SharedModule,
    MaterialModule,
    ButtonComponent,
    HttpClientModule,
    CoreModule,
    EffectsModule.forRoot([
      MileStoneUserEffects,
      MileStoneGroupsEffects,
      MileStartGroupTimerEffects,
      MilePoeplesEffects,
      MileStartPeopleTimerEffects,
      MileStoneGroupMessagesEffects,
      MileStartGroupMessagesTimerEffects,
    ]),
  ],
  exports: [GroupItemComponent, PersonItemComponent],
  providers: [
    SignupService,
    SigninService,
    AuthService,
    ProfileService,
    GroupDialogService,
    PeoplesService,
    GroupsService,
    MatIconRegistry,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
