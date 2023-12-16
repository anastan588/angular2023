import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IGroup } from 'src/app/core/models/groups';
import { GroupsService } from 'src/app/core/services/groups/groups.service';
import { DialogDeleteGroupComponent } from '../../../../shared/components/dialog-delete-group/dialog-delete-group.component';
import { group } from '@angular/animations';
import { IGroupDeleteRequest } from 'src/app/core/models/groupsUpdate';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
})
export class GroupItemComponent implements OnInit {
  @Input()
  currentGroup!: IGroup;
  userID!: string;

  constructor(
    private groupsService: GroupsService,
    private store: Store,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userBody = user ? JSON.parse(user) : null;
    this.userID = userBody.uid;
  }
  openDeleteForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '50vw';
    const data: IGroupDeleteRequest = {
      groupID: this.currentGroup.id.S,
      since: Number(this.currentGroup.createdAt.S),
    };
    console.log(this.currentGroup.id.S);
    const dialogRef = this.dialog.open(DialogDeleteGroupComponent, {
      ...dialogConfig,
      data: { groupID: data.groupID, since: data.since } as IGroupDeleteRequest,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog delete was closed');
    });
  }
}
