import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, count, map } from 'rxjs';
import {
  IGroupMessage,
  IGroupMessages,
  IGroupNewMessagesRequest,
} from 'src/app/core/models/groupMessages';
import { IGroup } from 'src/app/core/models/groups';
import { IServerResponseSignIn } from 'src/app/core/models/serverresponse';
import { GroupDialogService } from 'src/app/core/services/group-dialog/group-dialog.service';
import {
  addVisitedGroupToArchive,
  changeMessagesInArchivesGroup,
  loadMilestoneGroupMessages,
  loadMilestoneGroupMessagesSuccess,
  loadMilestoneUsers,
  resetGroupMessages,
  startCurrentGroupConversationTimer,
  stopCurrentGroupConversationTimer,
  stopCurrentGroupConversationTimerImmediately,
  updateCurrentGroupConversationTimer,
} from 'src/app/core/store/milestone/milestone.actions';
import {
  selectArchiveMessages,
  selectCurrentGroupForConversation,
  selectGroupConversationMessagesUpdateTime,
  selectGroupMessages,
} from 'src/app/core/store/milestone/milestone.selectors';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IGroupDeleteRequest } from 'src/app/core/models/groupsUpdate';
import { DialogDeleteGroupComponent } from 'src/app/shared';
import { ArchivedGroup } from 'src/app/core/models/visitedgroups';

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
  clickOnUpdateButtonGroups!: boolean;
  myInputValue!: string;
  isInArchiveToDownLoad!: boolean;
  isInArchiveToExtract!: boolean | undefined;
  messageFromArchive!: IGroupMessages;
  newMessageForm = this.fb.group({
    message: [
      '',
      {
        validators: [Validators.required, Validators.maxLength(250)],
      },
    ],
  });

  visitedGroup!: ArchivedGroup;
  private _Subscription!: Subscription;
  constructor(
    private groupDialogService: GroupDialogService,
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.newMessageObject = {
      groupID: '',
      message: '',
    };
    this.visitedGroup = {
      groupID: '',
      messages: [],
    };
    this.messageFromArchive = {
      Count: 0,
      Items: [],
    };
    this.isInArchiveToDownLoad = false;
    this.isInArchiveToExtract = false;
  }

  ngOnDestroy(): void {
    this.groupMessages$.subscribe(value => {
      this.visitedGroup = {
        ...this.visitedGroup,
        groupID: this.currentGroup.id.S,
      };
      this.visitedGroup = {
        ...this.visitedGroup,
        messages: value,
      };
    });
    this.store.select(selectArchiveMessages).subscribe(value => {
      console.log(value);
      value.forEach(item => {
        console.log(item.groupID);
        if (item.groupID === this.currentGroup.id.S) {
          this.isInArchiveToDownLoad = true;
        } else {
          this.isInArchiveToDownLoad = false;
        }
      });
    });

    if (this._Subscription) {
      this._Subscription.unsubscribe();
    }
    console.log(this.isInArchiveToDownLoad);
    if (this.isInArchiveToDownLoad === false) {
      this.store.dispatch(
        addVisitedGroupToArchive({ visitedGroup: this.visitedGroup })
      );
    } else {
      this.store.dispatch(
        changeMessagesInArchivesGroup({ visitedGroup: this.visitedGroup })
      );
    }
    this.store.dispatch(
      loadMilestoneGroupMessagesSuccess({
        groupMessages: this.messageFromArchive,
      })
    );
    this.store.dispatch(resetGroupMessages());
    this.groupDialogService.since = undefined;
    this.store.dispatch(stopCurrentGroupConversationTimerImmediately());
    this.store.dispatch(stopCurrentGroupConversationTimer());
    this.store.dispatch(
      updateCurrentGroupConversationTimer({ currenttime: 60 })
    );
  }

  ngOnInit(): void {
    console.log(this.currentGroup);

    // this.store.dispatch(loadMilestoneGroupMessages());
    this.store.select(selectCurrentGroupForConversation).subscribe(value => {
      this.currentGroup = value;
    });
    this._Subscription = this.store
      .select(selectArchiveMessages)
      .subscribe(value => {
        console.log(value);

        value.forEach(item => {
          console.log(item);
          if (item.groupID === this.currentGroup.id.S) {
            this.isInArchiveToExtract = true;
            this.messageFromArchive.Items = item.messages;
            this.messageFromArchive.Count = item.messages.length;
          }
          // else {
          //   this.isInArchiveToExtract = false;
          // }
          console.log(this.isInArchiveToExtract);
        });
      });
    if (this.isInArchiveToExtract === false) {
      console.log(this.isInArchiveToExtract);
      console.log(this._Subscription);
      this.store.dispatch(loadMilestoneGroupMessages());
    } else if (this.isInArchiveToExtract === true) {
      console.log(this.messageFromArchive);
      if (this.messageFromArchive.Count !== 0) {
        this.groupDialogService.since = Number(
          this.messageFromArchive.Items[
            this.messageFromArchive.Items.length - 1
          ].createdAt.S
        );
      }
      this.store.dispatch(
        loadMilestoneGroupMessagesSuccess({
          groupMessages: this.messageFromArchive,
        })
      );
      this.store.dispatch(loadMilestoneGroupMessages());
    }
    // this.isInArchiveToExtract = undefined;

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
    if (this.currentGroup.id.S !== '') {
      console.log(this.currentGroup.id.S);
      localStorage.setItem('currentGroup', JSON.stringify(this.currentGroup));
    }
    console.log(this.currentGroup.id.S);
    if (this.currentGroup.id.S === '') {
      const currentGruop = localStorage.getItem('currentGroup');
      const currentGruopBody: IGroup = currentGruop
        ? JSON.parse(currentGruop)
        : null;
      this.currentGroup = currentGruopBody;
      this.store.dispatch(loadMilestoneUsers());
    }
  }

  redirectToMain() {
    this.router.navigate(['/']);
  }

  sentNewMessage() {
    this.newMessageObject.groupID = this.currentGroup.id.S;
    this.newMessageObject.message = this.newMessageForm.value.message ?? '';
    this.groupDialogService.newMessageRequestObject$.next(
      this.newMessageObject
    );
    this.groupDialogService.sendNewMessageToGroup();
    this.myInputValue = '';
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
    this.timeUpdateGroupConversationTimer = 59;
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
