import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IGroupName } from 'src/app/core/models/groupsUpdate';
import { GroupsService } from 'src/app/core/services/groups/groups.service';

@Component({
  selector: 'app-dialog-create-group',
  templateUrl: './dialog-create-group.component.html',
  styleUrls: ['./dialog-create-group.component.scss'],
})
export class DialogCreateGroupComponent {
  requestbodyForName!: IGroupName;
  groupForm = this.fb.group({
    name: [
      '',
      {
        validators: [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[A-Za-z0-9 ]+$'),
        ],
      },
    ],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCreateGroupComponent>,
    private groupsSeRvice: GroupsService
  ) {
    this.requestbodyForName = {
      name: '',
    };
  }
  onCancel() {
    this.dialogRef.close();
  }
  createNewGroup() {
    console.log(this.groupForm.controls.name.value);
    this.requestbodyForName.name = JSON.parse(
      JSON.stringify(this.groupForm.controls.name.value)
    );
    console.log(this.requestbodyForName);
    this.groupsSeRvice.requestBodyForService$.next(this.requestbodyForName);
    this.groupsSeRvice.sentNewGroupData();
  }
}
