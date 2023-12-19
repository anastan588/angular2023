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
import { loadMilestonePersonalConversationMessages } from '../../store/milestone/milestone.actions';

@Injectable({
  providedIn: 'root',
})
export class PersonalConversationService {
  urlReceiveMessagesConversation: string;
  urlSendNewMessageConversation: string;
  currentPersonalConversationObject$ = new Subject<IGroup>();
  currentPersonalConversation$: Observable<IGroup>;
  currentPersonalConversation!: IGroup;
  httpHeaders!: HttpHeaders;
  catchedPersonalMessagesMessages!: Observable<IPersonMessage[]>;
  clickOnUpdateButtonObject$ = new Subject<boolean>();
  clickOnUpdateButton$!: Observable<boolean>;
  personalCOnversationMessagesRequest!: IGroupMessagesRequest;
  since!: number | undefined;
  newMessageRequestObject$ = new Subject<IGroupNewMessagesRequest>();
  newMessageRequest$!: Observable<IGroupNewMessagesRequest>;
  requestBodyNewMessage!: IGroupNewMessagesRequest;
  newMessageObject!: IPersonMessage;

  constructor(
    private store: Store,
    public http: HttpClient,
    private toastmessagesService: ToastMessageService
  ) {
    this.urlReceiveMessagesConversation =
      'conversations/read?groupID={:conversationID}&since={:since}';
    this.urlSendNewMessageGroup = 'groups/append';
    this.currentPersonalConversation$ =
      this.currentPersonalConversationObject$.asObservable();
    this.currentPersonalConversation$.subscribe(value => {
      this.currentPersonalConversation = value;
      console.log(this.currentPersonalConversation);
    });
    this.clickOnUpdateButton$ = this.clickOnUpdateButtonObject$.asObservable();
    this.personalCOnversationMessagesRequest = {
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
    console.log(this.currentPersonalConversation);
    console.log(this.since);
    if (this.currentPersonalConversation === undefined) {
      const currentPersonalConversation = localStorage.getItem(
        'currentPersonalConversation'
      );
      const currentPersonalConversationRequestBody: IGroup =
        currentPersonalConversation
          ? JSON.parse(currentPersonalConversation)
          : null;
      this.personalCOnversationMessagesRequest.groupID =
        currentGruopRequestBody.id.S;
      if (this.since === undefined) {
        this.urlReceiveMessagesConversation = `groups/read?groupID=${currentGruopRequestBody.id.S}`;
      } else {
        this.urlReceiveMessagesConversation = `groups/read?groupID=${currentGruopRequestBody.id.S}&since=${this.since}`;
      }
    } else {
      this.groupMessagesRequest.groupID = this.currentGroup.id.S;
      if (this.since === undefined) {
        this.urlReceiveMessagesConversation = `groups/read?groupID=${this.currentGroup.id.S}`;
      } else {
        this.urlReceiveMessagesConversation = `groups/read?groupID=${this.currentGroup.id.S}&since=${this.since}`;
      }
    }
    console.log(this.groupMessagesRequest);
    console.log(this.currentPersonalConversation);
    return this.http.get<IPersonMessages>(this.urlReceiveMessagesConversation, {
      headers: this.httpHeaders,
    });
  }

  getGroupMessagesFromStore() {
    this.catchedPersonalMessagesMessages = this.store.select(
      selectPersonalConversationsMessages
    );
    console.log(this.catchedPersonalMessagesMessages);
    return this.catchedPersonalMessagesMessages;
  }

  sendNewMessageToGroup() {
    console.log(this.requestBodyNewMessage);
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
          this.since = createdAt.getTime();
          this.store.dispatch(loadMilestonePersonalConversationMessages());
          // this.store.dispatch(
          //   addNewGroupMessage({ groupMessage: [this.newMessageObject] })
          // );
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignUp = error.error;
          console.log(serverResponse.message);
          console.log(serverResponse.type);
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
}
