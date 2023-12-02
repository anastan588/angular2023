import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingComponent } from './sorting.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

describe('SortingComponent', () => {
  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortingComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: Store,
          useValue: {
            select: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
          },
        },
      ], //
    });
    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
