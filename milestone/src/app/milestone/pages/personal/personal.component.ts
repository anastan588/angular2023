import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import {
  IConversation,
  ICreatePersonalConversationResponse,
} from 'src/app/core/models/conversations';
import {
  IPersonMessage,
  IPersonMessages,
} from 'src/app/core/models/personMessages';
import { IServerResponseSignIn } from 'src/app/core/models/serverresponse';
import {
  ArchivedPersonalConversation,
  ICurrentPersonalConversation,
  IPersonalCoversationNewMessagesRequest,
} from 'src/app/core/models/visitedPersonalConversations';
import { PersonalConversationService } from 'src/app/core/services/personal-conversation/personal-conversation.service';
import {
  addVisitedPersonalConversationToArchive,
  changeMessagesInArchivesPersonalConversation,
  loadMilestonePersonalConversationMessages,
  loadMilestonePersonalConversationMessagesSuccess,
  loadMilestoneUsers,
  resetPersonalConversationMessages,
  startCurrentGroupConversationTimer,
  startCurrentPersonalConversationTimer,
  stopCurrentPersonalConversationTimer,
  stopCurrentPersonalConversationTimerImmediately,
  updateCurrentPersonalConversationTimer,
} from 'src/app/core/store/milestone/milestone.actions';
import {
  selectArchiveDPersonalConversationMessages,
  selectCurrentPersonalConversationForConversation,
  selectPeoples,
  selectPersonalConversationMessagesUpdateTime,
  selectPersonalConversationsMessages,
} from 'src/app/core/store/milestone/milestone.selectors';
import { DialogDeleteConversationComponent } from 'src/app/shared/components/dialog-delete-conversation/dialog-delete-conversation.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  messageItem!: IPersonMessage;
  currentPersonalConversation!: ICurrentPersonalConversation;
  currentUser!: IServerResponseSignIn;
  userMessageName!: string;
  currentConversaionCompanion!: string;
  isCurrentPersonalCoversationGroup!: boolean;
  personalMessages$!: Observable<IPersonMessage[]>;
  sortedPersonalMessages!: Observable<IPersonMessage[]>;
  newMessageObject!: IPersonalCoversationNewMessagesRequest;
  timeUpdatePersonalConversationTimer!: number;
  clickOnUpdateButtonGroups!: boolean;
  myInputValue!: string;
  isInArchiveToDownLoad!: boolean;
  isInArchiveToExtract!: boolean | undefined;
  messageFromArchive!: IPersonMessages;
  newMessageForm = this.fb.group({
    message: [
      '',
      {
        validators: [Validators.required, Validators.maxLength(250)],
      },
    ],
  });

  visitedPersonalConversation!: ArchivedPersonalConversation;
  private _Subscription!: Subscription;
  constructor(
    private personalCoversationService: PersonalConversationService,
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.newMessageObject = {
      conversationID: '',
      message: '',
    };
    this.visitedPersonalConversation = {
      conversationID: '',
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
    this.personalMessages$.subscribe(value => {
      this.visitedPersonalConversation = {
        ...this.visitedPersonalConversation,
        conversationID: this.currentPersonalConversation.conversationID,
      };
      this.visitedPersonalConversation = {
        ...this.visitedPersonalConversation,
        messages: value,
      };
    });
    this.store
      .select(selectArchiveDPersonalConversationMessages)
      .subscribe(value => {
        console.log(value);
        value.forEach(item => {
          console.log(item.conversationID);
          if (
            item.conversationID ===
            this.currentPersonalConversation.conversationID
          ) {
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
        addVisitedPersonalConversationToArchive({
          visitedPersonalConversation: this.visitedPersonalConversation,
        })
      );
    } else {
      this.store.dispatch(
        changeMessagesInArchivesPersonalConversation({
          visitedPerSonConversation: this.visitedPersonalConversation,
        })
      );
    }
    this.store.dispatch(
      loadMilestonePersonalConversationMessagesSuccess({
        personalMessages: this.messageFromArchive,
      })
    );
    this.store.dispatch(resetPersonalConversationMessages());
    this.personalCoversationService.since = undefined;
    this.store.dispatch(stopCurrentPersonalConversationTimerImmediately());
    this.store.dispatch(stopCurrentPersonalConversationTimer());
    this.store.dispatch(
      updateCurrentPersonalConversationTimer({ currenttime: 60 })
    );
  }

  ngOnInit(): void {
    console.log(this.currentPersonalConversation);

    // this.store.dispatch(loadMilestoneGroupMessages());
    this.store
      .select(selectCurrentPersonalConversationForConversation)
      .subscribe(value => {
        this.currentPersonalConversation = value;
      });
    // this.currentConversaionCompanion =
    //   this.currentPersonalConversation.companionID;
    this.store.select(selectPeoples).subscribe(items => {
      items.forEach(item => {
        if (item.uid.S === this.currentPersonalConversation.companionID) {
          this.currentConversaionCompanion = item.name.S;
        }
      });
    });
    this._Subscription = this.store
      .select(selectArchiveDPersonalConversationMessages)
      .subscribe(value => {
        console.log(value);

        value.forEach(item => {
          console.log(item);
          if (
            item.conversationID ===
            this.currentPersonalConversation.conversationID
          ) {
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
      this.store.dispatch(loadMilestonePersonalConversationMessages());
    } else if (this.isInArchiveToExtract === true) {
      console.log(this.messageFromArchive);
      if (this.messageFromArchive.Count !== 0) {
        this.personalCoversationService.since = Number(
          this.messageFromArchive.Items[
            this.messageFromArchive.Items.length - 1
          ].createdAt.S
        );
      }
      this.store.dispatch(
        loadMilestonePersonalConversationMessagesSuccess({
          personalMessages: this.messageFromArchive,
        })
      );
      this.store.dispatch(loadMilestonePersonalConversationMessages());
    }
    // this.isInArchiveToExtract = undefined;

    const user = localStorage.getItem('user');
    this.currentUser = user ? JSON.parse(user) : null;
    console.log(this.currentUser);
    console.log(this.currentPersonalConversation.conversationID);
    if (
      this.currentPersonalConversation.conversationID === this.currentUser.uid
    ) {
      this.isCurrentPersonalCoversationGroup = true;
      console.log(this.isCurrentPersonalCoversationGroup);
    }

    this.personalMessages$ = this.store.select(
      selectPersonalConversationsMessages
    );
    this.sortedPersonalMessages = this.personalMessages$.pipe(
      map(personalMessages =>
        personalMessages.slice().sort((a, b) => {
          const dateA = Number(a.createdAt.S);
          const dateB = Number(b.createdAt.S);
          return dateA - dateB;
        })
      )
    );

    this.store
      .select(selectPersonalConversationMessagesUpdateTime)
      .subscribe(value => (this.timeUpdatePersonalConversationTimer = value));
    if (this.currentPersonalConversation.conversationID !== '') {
      console.log(this.currentPersonalConversation.conversationID);
      localStorage.setItem(
        'currentPersonalConversation',
        JSON.stringify(this.currentPersonalConversation)
      );
    }
    console.log(this.currentPersonalConversation.conversationID);
    if (this.currentPersonalConversation.conversationID === '') {
      const currentPersonalCoversation = localStorage.getItem(
        'currentPersonalConversation'
      );
      const currentCoversationBody: ICurrentPersonalConversation =
        currentPersonalCoversation
          ? JSON.parse(currentPersonalCoversation)
          : null;
      this.currentPersonalConversation = currentCoversationBody;
      this.store.dispatch(loadMilestoneUsers());
    }
  }

  redirectToMain() {
    this.router.navigate(['/']);
  }

  sentNewMessage() {
    this.newMessageObject.conversationID =
      this.currentPersonalConversation.conversationID;
    this.newMessageObject.message = this.newMessageForm.value.message ?? '';
    this.personalCoversationService.newMessageRequestObject$.next(
      this.newMessageObject
    );
    this.personalCoversationService.sendNewMessageToGroup();
    this.myInputValue = '';
  }

  openDeleteForm(event: Event) {
    event.stopPropagation();
    const button = event.currentTarget as HTMLButtonElement;
    console.log(button);
    button.blur();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '50vw';
    const data: ICreatePersonalConversationResponse = {
      conversationID: this.currentPersonalConversation.conversationID,
    };
    console.log(this.currentPersonalConversation.conversationID);
    const dialogRef = this.dialog.open(DialogDeleteConversationComponent, {
      ...dialogConfig,
      data: {
        conversationID: data.conversationID,
      } as ICreatePersonalConversationResponse,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog delete was closed');
    });
  }

  startTimerAndUpdatePersonalMessages() {
    this.clickOnUpdateButtonGroups = true;
    this.timeUpdatePersonalConversationTimer = 59;
    this.store.dispatch(startCurrentPersonalConversationTimer());
    this.personalCoversationService.clickOnUpdateButtonObject$.next(
      this.clickOnUpdateButtonGroups
    );
    this.store.dispatch(loadMilestonePersonalConversationMessages());
    this.clickOnUpdateButtonGroups = false;
    this.personalCoversationService.clickOnUpdateButtonObject$.next(
      this.clickOnUpdateButtonGroups
    );
  }
}
