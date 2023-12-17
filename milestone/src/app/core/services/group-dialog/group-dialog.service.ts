import { Injectable } from '@angular/core';
import { IGroup } from '../../models/groups';
import { Observable, Subject } from 'rxjs';
import { IServerResponseSignIn } from '../../models/serverresponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IGroupMessage, IGroupMessages, IGroupMessagesRequest } from '../../models/groupMessages';
import { Store } from '@ngrx/store';
import { selectGroupMessages } from '../../store/milestone/milestone.selectors';

@Injectable({
  providedIn: 'root',
})
export class GroupDialogService {
  urlReceiveMessagesGroup: string;
  currentGroupObject$ = new Subject<IGroup>();
  currentGroup$: Observable<IGroup>;
  currentGroup!: IGroup;
  httpHeaders!: HttpHeaders;
  catchedGroupMessages!: Observable<IGroupMessage[]>;
  clickOnUpdateButtonObject$ = new Subject<boolean>();
  clickOnUpdateButton$!: Observable<boolean>;
  groupMessagesRequest!: IGroupMessagesRequest;
  since!: number;

  constructor(private store: Store,
    public http: HttpClient) {
    this.urlReceiveMessagesGroup =
      'groups/read?groupID={:groupID}&since={:since}';
    this.currentGroup$ = this.currentGroupObject$.asObservable();
    this.currentGroup$.subscribe(value => {
      this.currentGroup = value;
      console.log(this.currentGroup);
    });
    this.clickOnUpdateButton$ = this.clickOnUpdateButtonObject$.asObservable();
    this.groupMessagesRequest= {
      groupID: '',
    }
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
    this.groupMessagesRequest.groupID = this.currentGroup.id.S;
    this.urlReceiveMessagesGroup = `groups/read?groupID=${this.currentGroup.id.S}`
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
}
