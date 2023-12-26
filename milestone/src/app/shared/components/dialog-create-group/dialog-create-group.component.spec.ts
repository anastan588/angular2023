import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateGroupComponent } from './dialog-create-group.component';

describe('DialogCreateGroupComponent', () => {
  let component: DialogCreateGroupComponent;
  let fixture: ComponentFixture<DialogCreateGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCreateGroupComponent]
    });
    fixture = TestBed.createComponent(DialogCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
