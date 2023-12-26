import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputComponent],
    });
  });

  it('should create', () => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
