import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { IPersonMessage, IPersonMessages } from '../../models/personMessages';
import { Store } from '@ngrx/store';
import { ToastMessageService } from '../toast-message.service';
import {
  IServerResponseSignIn,
  IServerResponseSignUp,
} from '../../models/serverresponse';
import { selectPersonalConversationsMessages } from '../../store/milestone/milestone.selectors';
import {
  loadMilestonePersonalConversationMessages,
  removeConversation,
} from '../../store/milestone/milestone.actions';
import {
  ICurrentPersonalConversation,
  IPersonalCoversationNewMessagesRequest,
} from '../../models/visitedPersonalConversations';
import { ICreatePersonalConversationResponse } from '../../models/conversations';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class PersonalConversationService {
  urlReceiveMessagesConversation: string;
  urlSendNewMessageConversation: string;
  urlDeletePersonalConversation!: string;
  currentPersonalConversationObject$ =
    new Subject<ICurrentPersonalConversation>();
  currentPersonalConversation$: Observable<ICurrentPersonalConversation>;
  currentPersonalConversation!: ICurrentPersonalConversation;
  httpHeaders!: HttpHeaders;
  catchedPersonalMessagesMessages!: Observable<IPersonMessage[]>;
  clickOnUpdateButtonObject$ = new Subject<boolean>();
  clickOnUpdateButton$!: Observable<boolean>;
  personalConversationMessagesRequest!: ICreatePersonalConversationResponse;
  since!: number | undefined;
  newMessageRequestObject$ =
    new Subject<IPersonalCoversationNewMessagesRequest>();
  newMessageRequest$!: Observable<IPersonalCoversationNewMessagesRequest>;
  requestBodyNewMessage!: IPersonalCoversationNewMessagesRequest;
  newMessageObject!: IPersonMessage;

  constructor(
    private store: Store,
    public http: HttpClient,
    private toastmessagesService: ToastMessageService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.urlReceiveMessagesConversation =
      'conversations/read?conversationID={:conversationID}&since={:since}';
    this.urlSendNewMessageConversation = 'conversations/append';
    this.currentPersonalConversation$ =
      this.currentPersonalConversationObject$.asObservable();
    this.currentPersonalConversation$.subscribe(value => {
      this.currentPersonalConversation = value;
      console.log(this.currentPersonalConversation);
    });
    this.clickOnUpdateButton$ = this.clickOnUpdateButtonObject$.asObservable();
    this.personalConversationMessagesRequest = {
      conversationID: '',
    };
    this.newMessageRequest$ = this.newMessageRequestObject$.asObservable();
    this.newMessageRequest$.subscribe(
      value => (this.requestBodyNewMessage = value)
    );
  }

  setHttpHeaders() {
    const user = localStorage.getItem('user');
    const userRequestBody: IServerResponseSignIn = user
      ? JSON.parse(user)
      : null;
    if (userRequestBody !== null) {
      this.httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${userRequestBody.token}`,
        'rs-uid': `${userRequestBody.uid}`,
        'rs-email': `${userRequestBody.email}`,
      });
    }
  }

  getGroupMessagesData() {
    this.setHttpHeaders();
    console.log(this.currentPersonalConversation === undefined);
    if (this.currentPersonalConversation.companionID === '') {
      const currentPersonalConversation = localStorage.getItem(
        'currentPersonalConversation'
      );
      const currentPersonalConversationRequestBody: ICurrentPersonalConversation =
        currentPersonalConversation
          ? JSON.parse(currentPersonalConversation)
          : null;
      this.personalConversationMessagesRequest.conversationID =
        currentPersonalConversationRequestBody.conversationID;
        console.log(this.personalConversationMessagesRequest.conversationID);
      if (this.since === undefined) {
        this.urlReceiveMessagesConversation = `conversations/read?conversationID=${currentPersonalConversationRequestBody.conversationID}`;
      } else {
        this.urlReceiveMessagesConversation = `conversations/read?conversationID=${currentPersonalConversationRequestBody.conversationID}&since=${this.since}`;
      }
    } else {
      this.personalConversationMessagesRequest.conversationID =
        this.currentPersonalConversation.conversationID;
      if (this.since === undefined) {
        this.urlReceiveMessagesConversation = `conversations/read?conversationID=${this.currentPersonalConversation.conversationID}`;
      } else {
        this.urlReceiveMessagesConversation = `conversations/read?conversationID=${this.currentPersonalConversation.conversationID}&since=${this.since}`;
      }
    }
    console.log(this.currentPersonalConversation);
    return this.http.get<IPersonMessages>(this.urlReceiveMessagesConversation, {
      headers: this.httpHeaders,
    });
  }

  getGroupMessagesFromStore() {
    this.catchedPersonalMessagesMessages = this.store.select(
      selectPersonalConversationsMessages
    );
    return this.catchedPersonalMessagesMessages;
  }

  sendNewMessageToGroup() {
    this.setHttpHeaders();
    const createdAt = new Date();
    return this.http
      .post(this.urlSendNewMessageConversation, this.requestBodyNewMessage, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(response => {
          this.toastmessagesService.showToastMessage(
            'Send new message succeed',
            'close'
          );

          this.newMessageObject = {
            authorID: {
              S: JSON.parse(JSON.stringify(this.httpHeaders.get('rs-uid'))),
            },
            message: {
              S: this.requestBodyNewMessage.message,
            },
            createdAt: {
              S: createdAt.getTime().toString(),
            },
          };
          console.log(this.newMessageObject);
          this.store
            .select(selectPersonalConversationsMessages)
            .subscribe(value => {
              if (value.length === 0) {
                this.since = createdAt.getTime();
                console.log(this.since);
              } else {
                this.since = createdAt.getTime();
                console.log(this.since);
              }
            });

          this.store.dispatch(loadMilestonePersonalConversationMessages());
          // this.store.dispatch(
          //   addNewGroupMessage({ groupMessage: [this.newMessageObject] })
          // );
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignUp = error.error;
          this.toastmessagesService.showToastMessage(
            'Creating new personal message failed: ' + serverResponse.message,
            'close'
          );
          return of({
            type: serverResponse.type,
            message: serverResponse.message,
          });
        })
      )
      .subscribe(value => {
        return value;
      });
  }

  sentDeletePersonalCoversationData() {
    console.log(this.currentPersonalConversation);
    this.urlDeletePersonalConversation = `conversations/delete?conversationID=${this.currentPersonalConversation.conversationID}`;
    return this.http
      .delete(this.urlDeletePersonalConversation, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(response => {
          this.toastmessagesService.showToastMessage(
            'Deletion of personal conversatioon succeed',
            'close'
          );

          this.store.dispatch(
            removeConversation({
              id: this.currentPersonalConversation.conversationID,
            })
          );
          const currenUrl = this.router.url;
          if (currenUrl !== '/') {
            this.router.navigate(['/']);
          }
          console.log(currenUrl);
          setTimeout(() => {
            this.dialog.closeAll();
          }, 1000);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignUp = error.error;
          this.toastmessagesService.showToastMessage(
            'Deleting personal conversation failed: ' + serverResponse.message,
            'close'
          );
          return of({
            type: serverResponse.type,
            message: serverResponse.message,
          });
        })
      )
      .subscribe(value => {
        return value;
      });
  }
}
