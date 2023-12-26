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
import {
  IGroupCreateResponse,
  IGroupDeleteRequest,
  IGroupName,
} from '../../models/groupsUpdate';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import {
  addNewGroup,
  loadMilestoneGroupMessages,
  removeUserGroup,
} from '../../store/milestone/milestone.actions';
import { MatDialog } from '@angular/material/dialog';
import { selectGroups } from '../../store/milestone/milestone.selectors';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  urlgroupsList: string;
  urlgroupsCreate: string;
  urlgroupsDelete: string;
  httpHeaders!: HttpHeaders;
  requestBodyForServiceCreate$ = new Subject<IGroupName>();
  requestBodyCreate$!: Observable<IGroupName>;
  requestCreate!: IGroupName;
  requestBodyForServiceDelete$ = new Subject<IGroupDeleteRequest>();
  requestBodyDelete$!: Observable<IGroupDeleteRequest>;
  requestDelete!: IGroupDeleteRequest;
  newGroupItem!: IGroup;
  catchedGroups!: Observable<IGroup[]>;
  clickOnUpdateButtonObject$ = new Subject<boolean>();
  clickOnUpdateButton$!: Observable<boolean>;
  catchedUpdateButtonState!: boolean;

  constructor(
    public http: HttpClient,
    private store: Store,
    private toastmessageservice: ToastMessageService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.urlgroupsList = 'groups/list';
    this.urlgroupsCreate = 'groups/create';
    this.urlgroupsDelete = `groups/delete?groupID={:groupID}`;
    this.requestBodyCreate$ = this.requestBodyForServiceCreate$.asObservable();

    this.requestBodyForServiceCreate$.subscribe(value => {
      this.requestCreate = value;
    });
    this.requestBodyDelete$ = this.requestBodyForServiceDelete$.asObservable();

    this.requestBodyForServiceDelete$.subscribe(value => {
      this.requestDelete = value;
    });
    this.clickOnUpdateButton$ = this.clickOnUpdateButtonObject$.asObservable();
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
    console.log(this.requestCreate);
    const createdAt = new Date();
    return this.http
      .post<IGroupCreateResponse>(this.urlgroupsCreate, this.requestCreate, {
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
              S: this.requestCreate.name,
            },
            createdAt: {
              S: createdAt.getTime().toString(),
            },
            createdBy: {
              S: JSON.parse(JSON.stringify(this.httpHeaders.get('rs-uid'))),
            },
          };

          
          this.store.dispatch(addNewGroup({ IGroupItem: this.newGroupItem }));
          setTimeout(() => {
            this.dialog.closeAll();
          }, 1000);
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignUp = error.error;
          this.toastmessageservice.showToastMessage(
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

  getGroupsFromStore() {
    this.catchedGroups = this.store.select(selectGroups);
    return this.catchedGroups;
  }

  sentDeleteGroupData() {
    this.urlgroupsDelete = `groups/delete?groupID=${this.requestDelete.groupID}`;
    return this.http
      .delete(this.urlgroupsDelete, {
        headers: this.httpHeaders,
      })
      .pipe(
        map(response => {
          this.toastmessageservice.showToastMessage(
            'Deletion of group succeed',
            'close'
          );

          this.store.dispatch(
            removeUserGroup({ id: this.requestDelete.groupID })
          );
          const currenUrl = this.router.url;
          if (currenUrl !=='/') {
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
          this.toastmessageservice.showToastMessage(
            'Deleting group failed: ' + serverResponse.message,
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
