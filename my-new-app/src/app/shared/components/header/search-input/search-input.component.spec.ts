import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: Store,
          useValue: {
            select: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
          },
        }, // Provide a mock version of _Store
      ],
    });
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
