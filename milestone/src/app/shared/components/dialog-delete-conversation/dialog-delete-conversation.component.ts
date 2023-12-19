import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICreatePersonalConversationResponse } from 'src/app/core/models/conversations';
import { PersonalConversationService } from 'src/app/core/services/personal-conversation/personal-conversation.service';

@Component({
  selector: 'app-dialog-delete-conversation',
  templateUrl: './dialog-delete-conversation.component.html',
  styleUrls: ['./dialog-delete-conversation.component.scss']
})
export class DialogDeleteConversationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteConversationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICreatePersonalConversationResponse,
    private personalService: PersonalConversationService
  ) {}
  onCancel() {
    this.dialogRef.close();
  }

  deleteCurrentCoversation() {
    console.log(this.data);
    this.personalService.sentDeletePersonalCoversationData();
  }
}
