import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IVideoItem } from 'src/app/core/data/models/video-item';

const initialState = { videos: [] };



describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      imports: [ HttpClientTestingModule], 
      providers: [
        provideMockStore({ initialState }), // Provide MockStore with initial state
      ],
    });
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore.setState(initialState); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
