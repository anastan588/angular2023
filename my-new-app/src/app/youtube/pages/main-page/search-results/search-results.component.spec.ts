import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IVideoItem } from './../../../../core/data/models/video-item';
import { FilterPipe } from './../../../../shared/pipes/filter.pipe';
import { SortingPipe } from './../../../../shared/pipes/sorting.pipe';

const initialState = { videos: [] };

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent, FilterPipe, SortingPipe],
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState }), // Provide MockStore with initial state
      ],
    });
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
    mockStore.setState(initialState);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
