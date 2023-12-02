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
import { ActivatedRoute } from '@angular/router';

const mockUser = {
  email: 'mail@mail.ru',
  password: '123456Ui',
};

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        StateObservable,
        ActionsSubject,
        {
          provide: Store,
          useValue: {
            select: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
