import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastMessageService } from '../toast-message.service';
import {
  IServerResponseSignIn,
  IServerResponseSignUp,
} from '../../models/serverresponse';
import { IGroup, IGroups } from '../../models/groups';
import { IGroupCreateResponse, IGroupName } from '../../models/groupsUpdate';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { addNewGroup } from '../../store/milestone/milestone.actions';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  urlgroupsList: string;
  urlgroupsCreate: string;
  urlgroupsDelete: string;
  httpHeaders!: HttpHeaders;
  requestBodyForService$ = new Subject<IGroupName>();
  requestBody$!: Observable<IGroupName>;
  request!: IGroupName;
  newGroupItem!: IGroup;

  constructor(
    public http: HttpClient,
    private store: Store,
    private toastmessageservice: ToastMessageService,
    public dialog: MatDialog
  ) {
    this.urlgroupsList = 'groups/list';
    this.urlgroupsCreate = 'groups/create';
    this.urlgroupsDelete = 'groups/delete?groupID={:groupID}';
    this.requestBody$ = this.requestBodyForService$.asObservable();

    this.requestBodyForService$.subscribe(value => {
      this.request = value;
    });
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
    return this.http.get<IGroups>(this.urlgroupsList, {
      headers: this.httpHeaders,
    });
  }

  sentNewGroupData() {
    console.log(this.request);
    const createdAt = new Date();
    return this.http
      .post<IGroupCreateResponse>(this.urlgroupsCreate, this.request, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(response => {
          this.toastmessageservice.showToastMessage(
            'Creation new group succeed',
            'close'
          );

          this.newGroupItem = {
            id: {
              S: response.groupID,
            },
            name: {
              S: this.request.name,
            },
            createdAt: {
              S: createdAt.toString(),
            },
            createdBy: {
              S: JSON.parse(JSON.stringify(this.httpHeaders.get('rs-uid'))),
            },
          };
          console.log(this.newGroupItem);
          this.store.dispatch(addNewGroup({ IGroupItem: this.newGroupItem }));
          setTimeout(() => {
            this.dialog.closeAll();
          }, 1000);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignUp = error.error;
          console.log(serverResponse.message);
          console.log(serverResponse.type);
          this.toastmessageservice.showToastMessage(
            'Updating user name failed: ' + serverResponse.message,
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
