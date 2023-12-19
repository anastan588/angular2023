import { Injectable } from '@angular/core';
import { IGroup } from '../../models/groups';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import {
  IServerResponseSignIn,
  IServerResponseSignUp,
} from '../../models/serverresponse';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  IGroupMessage,
  IGroupMessages,
  IGroupMessagesRequest,
  IGroupNewMessagesRequest,
} from '../../models/groupMessages';
import { Store } from '@ngrx/store';
import {
  selectGroupMessages,
  selectPeoples,
} from '../../store/milestone/milestone.selectors';
import { IPerson } from '../../models/peoples';
import { ToastMessageService } from '../toast-message.service';
import {
  addNewGroupMessage,
  loadMilestoneGroupMessages,
} from '../../store/milestone/milestone.actions';

@Injectable({
  providedIn: 'root',
})
export class GroupDialogService {
  urlReceiveMessagesGroup: string;
  urlSendNewMessageGroup: string;
  currentGroupObject$ = new Subject<IGroup>();
  currentGroup$: Observable<IGroup>;
  currentGroup!: IGroup;
  httpHeaders!: HttpHeaders;
  catchedGroupMessages!: Observable<IGroupMessage[]>;
  clickOnUpdateButtonObject$ = new Subject<boolean>();
  clickOnUpdateButton$!: Observable<boolean>;
  groupMessagesRequest!: IGroupMessagesRequest;
  since!: number | undefined;
  newMessageRequestObject$ = new Subject<IGroupNewMessagesRequest>();
  newMessageRequest$!: Observable<IGroupNewMessagesRequest>;
  requestBodyNewMessage!: IGroupNewMessagesRequest;
  newMessageObject!: IGroupMessage;

  constructor(
    private store: Store,
    public http: HttpClient,
    private toastmessagesService: ToastMessageService
  ) {
    this.urlReceiveMessagesGroup =
      'groups/read?groupID={:groupID}&since={:since}';
    this.urlSendNewMessageGroup = 'groups/append';
    this.currentGroup$ = this.currentGroupObject$.asObservable();
    this.currentGroup$.subscribe(value => {
      this.currentGroup = value;
      console.log(this.currentGroup);
    });
    this.clickOnUpdateButton$ = this.clickOnUpdateButtonObject$.asObservable();
    this.groupMessagesRequest = {
      groupID: '',
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
    console.log(this.currentGroup);
    console.log(this.since);
    if (this.currentGroup === undefined) {
      const currentGruop = localStorage.getItem('currentGroup');
      const currentGruopRequestBody: IGroup = currentGruop
        ? JSON.parse(currentGruop)
        : null;
      this.groupMessagesRequest.groupID = currentGruopRequestBody.id.S;
      if (this.since === undefined) {
        this.urlReceiveMessagesGroup = `groups/read?groupID=${currentGruopRequestBody.id.S}`;
      } else {
        this.urlReceiveMessagesGroup = `groups/read?groupID=${currentGruopRequestBody.id.S}&since=${this.since}`;
      }
    } else {
      this.groupMessagesRequest.groupID = this.currentGroup.id.S;
      if (this.since === undefined) {
        this.urlReceiveMessagesGroup = `groups/read?groupID=${this.currentGroup.id.S}`;
      } else {
        this.urlReceiveMessagesGroup = `groups/read?groupID=${this.currentGroup.id.S}&since=${this.since}`;
      }
    }
    console.log(this.groupMessagesRequest);
    console.log(this.currentGroup);
    return this.http.get<IGroupMessages>(this.urlReceiveMessagesGroup, {
      headers: this.httpHeaders,
    });
  }

  getGroupMessagesFromStore() {
    this.catchedGroupMessages = this.store.select(selectGroupMessages);
    console.log(this.catchedGroupMessages);
    return this.catchedGroupMessages;
  }

  sendNewMessageToGroup() {
    console.log(this.requestBodyNewMessage);
    this.setHttpHeaders();
    const createdAt = new Date();
    return this.http
      .post(this.urlSendNewMessageGroup, this.requestBodyNewMessage, {
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
          this.store.dispatch(loadMilestoneGroupMessages());
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
            'Creating new group failed: ' + serverResponse.message,
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
