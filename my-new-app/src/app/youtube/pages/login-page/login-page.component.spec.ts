import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import {
  ActionsSubject,
  ReducerManager,
  ReducerManagerDispatcher,
  StateObservable,
  Store,
  StoreModule,
} from '@ngrx/store';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        StateObservable,
        ActionsSubject,
        ReducerManager,
        ReducerManagerDispatcher,
        StoreModule.forRoot({}),
        Store,
      ],
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
