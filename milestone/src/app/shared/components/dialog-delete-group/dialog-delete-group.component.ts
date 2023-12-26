import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IGroupDeleteRequest} from 'src/app/core/models/groupsUpdate';
import { GroupsService } from 'src/app/core/services/groups/groups.service';

@Component({
  selector: 'app-dialog-delete-group',
  templateUrl: './dialog-delete-group.component.html',
  styleUrls: ['./dialog-delete-group.component.scss'],
})
export class DialogDeleteGroupComponent  {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGroupDeleteRequest,
    private groupService: GroupsService
  ) {}
  onCancel() {
    this.dialogRef.close();
  }

  deleteCurrentGroup() {
    console.log(this.data);
    this.groupService.requestBodyForServiceDelete$.next(this.data);
    this.groupService.sentDeleteGroupData();
  }
}
