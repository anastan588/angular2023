import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavoritePageComponent } from './favorite-page.component';
import { Store } from '@ngrx/store';
import { FilterPipe } from './../../../shared/pipes/filter.pipe';
import { ActivatedRoute } from '@angular/router';

describe('FavoritePageComponent', () => {
  let component: FavoritePageComponent;
  let fixture: ComponentFixture<FavoritePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritePageComponent],
      imports: [HttpClientTestingModule],
      providers: [
        FilterPipe,
        {
          provide: Store,
          useValue: {
            select: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
          },
        },
      ],
    });
    fixture = TestBed.createComponent(FavoritePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
