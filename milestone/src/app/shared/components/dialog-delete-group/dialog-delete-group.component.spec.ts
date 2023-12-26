import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteGroupComponent } from './dialog-delete-group.component';

describe('DialogDeleteGroupComponent', () => {
  let component: DialogDeleteGroupComponent;
  let fixture: ComponentFixture<DialogDeleteGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteGroupComponent]
    });
    fixture = TestBed.createComponent(DialogDeleteGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
