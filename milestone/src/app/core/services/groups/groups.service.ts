import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastMessageService } from '../toast-message.service';
import { IServerResponseSignIn } from '../../models/serverresponse';
import { IGroups } from '../../models/groups';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  url: string;
  httpHeaders!: HttpHeaders;
  constructor(
    public http: HttpClient,
    private store: Store,
    private toastmessageservice: ToastMessageService
  ) {
    this.url = 'groups/list';
  }

  getGroupsData() {
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
    return this.http.get<IGroups>(this.url, { headers: this.httpHeaders });
  }

}
