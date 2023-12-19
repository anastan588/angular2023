import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonalConversationService } from 'src/app/core/services/personal-conversation/personal-conversation.service';

@Component({
  selector: 'app-dialog-delete-conversation',
  templateUrl: './dialog-delete-conversation.component.html',
  styleUrls: ['./dialog-delete-conversation.component.scss']
})
export class DialogDeleteConversationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteConversationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGroupDeleteRequest,
    private personalService: PersonalConversationService
  ) {}
  onCancel() {
    this.dialogRef.close();
  }

  deleteCurrentCoversation() {
    console.log(this.data);
    this.groupService.requestBodyForServiceDelete$.next(this.data);
    this.groupService.sentDeleteGroupData();
  }
}
