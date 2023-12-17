import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IGroup } from 'src/app/core/models/groups';
import { GroupsService } from 'src/app/core/services/groups/groups.service';
import { DialogDeleteGroupComponent } from '../../../../shared/components/dialog-delete-group/dialog-delete-group.component';
import { IGroupDeleteRequest } from 'src/app/core/models/groupsUpdate';
import { Router } from '@angular/router';
import { GroupDialogService } from 'src/app/core/services/group-dialog/group-dialog.service';
import { loadMilestoneCurrentGroupForConversationSuccess } from 'src/app/core/store/milestone/milestone.actions';

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
    public dialog: MatDialog,
    private router: Router,
    private groupDialogService: GroupDialogService
  ) {}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userBody = user ? JSON.parse(user) : null;
    this.userID = userBody.uid;
  }
  openDeleteForm(event: Event) {
    event.stopPropagation();
    const button = event.currentTarget as HTMLButtonElement;
    console.log(button);
    button.blur();
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
  navigateToGropConverstionPage(event: Event) {
    event.stopPropagation();
    console.log(this.currentGroup);
    this.groupDialogService.currentGroupObject$.next(this.currentGroup);
    this.store.dispatch(
      loadMilestoneCurrentGroupForConversationSuccess({
        currentGroup: this.currentGroup,
      })
    );
    this.router.navigate(['group', this.currentGroup.id.S]);
  }
}
