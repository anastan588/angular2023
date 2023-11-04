import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPageComponent } from './detailed-page.component';

describe('DetailedPageComponent', () => {
  let component: DetailedPageComponent;
  let fixture: ComponentFixture<DetailedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedPageComponent]
    });
    fixture = TestBed.createComponent(DetailedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
