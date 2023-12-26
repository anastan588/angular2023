import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FiltersService } from './../../../core/services/filters/filters.service';
import { ApiService } from './../../../core/services/api/api.service';
import { ActionsSubject, ReducerManager, ReducerManagerDispatcher, StateObservable, Store, StoreModule } from '@ngrx/store';


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [HttpClientTestingModule, StoreModule.forRoot({}) ],
      providers: [FiltersService, ApiService, Store, StateObservable, ActionsSubject, ReducerManager, ReducerManagerDispatcher],
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
