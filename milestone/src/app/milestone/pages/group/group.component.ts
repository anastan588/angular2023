import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IGroupMessage, IGroupNewMessagesRequest } from 'src/app/core/models/groupMessages';
import { IGroup } from 'src/app/core/models/groups';
import { IServerResponseSignIn } from 'src/app/core/models/serverresponse';
import { GroupDialogService } from 'src/app/core/services/group-dialog/group-dialog.service';
import {
  loadMilestoneConversations,
  loadMilestoneGroupMessages, startCurrentGroupConversationTimer,
} from 'src/app/core/store/milestone/milestone.actions';
import {
  selectCurrentGroupForConversation,
  selectGroupConversationMessagesUpdateTime,
  selectGroupMessages,
} from 'src/app/core/store/milestone/milestone.selectors';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IGroupDeleteRequest } from 'src/app/core/models/groupsUpdate';
import { DialogDeleteGroupComponent } from 'src/app/shared';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  messageItem!: IGroupMessage;
  currentGroup!: IGroup;
  currentUser!: IServerResponseSignIn;
  userMessageName!: string;
  isCurrentUserGroup!: boolean;
  groupMessages$!: Observable<IGroupMessage[]>;
  sortedGroupMessages!: Observable<IGroupMessage[]>;
  newMessageObject!: IGroupNewMessagesRequest;
  timeUpdateGroupConversationTimer!: number;
  clickOnUpdateButtonGroups!:boolean;
  newMessageForm = this.fb.group({
    message: [
      '',
      {
        validators: [
          Validators.required,
         Validators.maxLength(250),
        ],
      },
    ],
  });
  constructor(
    private groupDialogService: GroupDialogService,
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.newMessageObject = {
      groupID: '',
      message: '',
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadMilestoneGroupMessages());
    this.store.select(selectCurrentGroupForConversation).subscribe(value => {
      this.currentGroup = value;
    });
    const user = localStorage.getItem('user');
    this.currentUser = user ? JSON.parse(user) : null;
    console.log(this.currentUser);
    console.log(this.currentGroup.createdBy.S);
    if (this.currentGroup.createdBy.S === this.currentUser.uid) {
      this.isCurrentUserGroup = true;
      console.log(this.isCurrentUserGroup);
    }
    
  
    this.groupMessages$ = this.store.select(selectGroupMessages);
    this.sortedGroupMessages = this.groupMessages$.pipe(
      map(groupMessages =>
        groupMessages.slice().sort((a, b) => {
          const dateA = Number(a.createdAt.S);
          const dateB = Number(b.createdAt.S);
          return dateA - dateB;
        })
      )
    );

    this.store
      .select(selectGroupConversationMessagesUpdateTime)
      .subscribe(value => (this.timeUpdateGroupConversationTimer = value));
  }

  redirectToMain() {
    this.router.navigate(['/']);
  }

  sentNewMessage() {
  this.newMessageObject.groupID = this.currentGroup.id.S;
  this.newMessageObject.message = this.newMessageForm.value.message ?? '';
  this.groupDialogService.newMessageRequestObject$.next(this.newMessageObject);
  this.groupDialogService.sendNewMessageToGroup();
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

  startTimerAndUpdateGroupMessages() {
    this.clickOnUpdateButtonGroups = true;
    // this.timeUpdateGroupConversationTimer = 59;
    this.store.dispatch(startCurrentGroupConversationTimer());
    this.groupDialogService.clickOnUpdateButtonObject$.next(
      this.clickOnUpdateButtonGroups
    );
    this.store.dispatch(loadMilestoneGroupMessages());
    this.clickOnUpdateButtonGroups = false;
    this.groupDialogService.clickOnUpdateButtonObject$.next(
      this.clickOnUpdateButtonGroups
    );
  }
}
