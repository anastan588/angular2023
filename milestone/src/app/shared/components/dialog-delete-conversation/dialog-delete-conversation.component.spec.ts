import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteConversationComponent } from './dialog-delete-conversation.component';

describe('DialogDeleteConversationComponent', () => {
  let component: DialogDeleteConversationComponent;
  let fixture: ComponentFixture<DialogDeleteConversationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteConversationComponent]
    });
    fixture = TestBed.createComponent(DialogDeleteConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
