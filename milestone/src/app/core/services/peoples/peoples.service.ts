import { Injectable } from '@angular/core';
import {
  IServerResponseSignIn,
  IServerResponseSignUp,
} from '../../models/serverresponse';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { IPeoples, IPerson } from '../../models/peoples';
import {
  Observable,
  Subject,
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPeoples } from '../../store/milestone/milestone.selectors';
import {
  ICompanion,
  IConversation,
  IConversations,
  ICreatePersonalConversationResponse,
} from '../../models/conversations';
import { ToastMessageService } from '../toast-message.service';
import {
  addNewConversation,
  loadMilestoneConversationsSuccess,
  loadMilestoneCurrentPersonalConversationSuccess,
} from '../../store/milestone/milestone.actions';
import { Router } from '@angular/router';
import { ICurrentPersonalConversation } from '../../models/visitedPersonalConversations';

@Injectable({
  providedIn: 'root',
})
export class PeoplesService {
  urlpeoplesList: string;
  urlconversationList: string;
  urlconversationCreate: string;
  newConversationItem!: IConversation;

  httpHeaders!: HttpHeaders;
  catchedPeople!: Observable<IPerson[]>;
  clickOnUpdateButtonObject$ = new Subject<boolean>();
  clickOnUpdateButton$!: Observable<boolean>;
  personID!: string;

  newCompanionConversationObject$ = new Subject<ICompanion>();
  newCompanionConversation$!: Observable<ICompanion>;
  newCompanion!: ICompanion;

  currentConversation!: ICurrentPersonalConversation;

  constructor(
    public http: HttpClient,
    private store: Store,
    private toastmessageService: ToastMessageService,
    private router: Router
  ) {
    this.urlpeoplesList = 'users';
    this.urlconversationList = 'conversations/list';
    this.urlconversationCreate = 'conversations/create';
    this.clickOnUpdateButton$ = this.clickOnUpdateButtonObject$.asObservable();
    this.newCompanionConversation$ =
      this.newCompanionConversationObject$.asObservable();
    this.newCompanionConversation$.subscribe(value => {
      this.newCompanion = value;
    });
    this.currentConversation = {
      conversationID: '',
      companionID: '',
    };
  }

  joinRequests(requests: Observable<any>[]): Observable<any[]> {
    return forkJoin(requests);
  }

  serHttpHeaders() {
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

  getPeoplesData() {
    this.serHttpHeaders();
    return this.http.get<IPeoples>(this.urlpeoplesList, {
      headers: this.httpHeaders,
    });
  }
  getConverasationData() {
    this.serHttpHeaders();
    return this.http.get<IConversations>(this.urlconversationList, {
      headers: this.httpHeaders,
    });
  }

  getPeopleFromStore() {
    this.catchedPeople = this.store.select(selectPeoples);
    console.log(this.catchedPeople);
    return this.catchedPeople;
  }

  createNewConversationWithPerson() {
    console.log(this.newCompanion);
    return this.http
      .post<ICreatePersonalConversationResponse>(
        this.urlconversationCreate,
        this.newCompanion,
        {
          headers: this.httpHeaders,
        }
      )
      .pipe(
        map(response => {
          this.toastmessageService.showToastMessage(
            `Creation new conversation with ${this.newCompanion.companion} user succeed`,
            'close'
          );

          this.newConversationItem = {
            id: {
              S: response.conversationID,
            },
            companionID: {
              S: this.newCompanion.companion,
            },
          };
          console.log(this.newConversationItem);
          this.store.dispatch(
            addNewConversation({ conversation: this.newConversationItem })
          );
          this.currentConversation.companionID =
            this.newConversationItem.companionID.S;
          this.currentConversation.conversationID =
            this.newConversationItem.id.S;
          console.log(this.newConversationItem);
          console.log(this.currentConversation);
          this.store.dispatch(
            loadMilestoneCurrentPersonalConversationSuccess({
              currentPersonalConversation: this.currentConversation,
            })
          );
          this.router.navigate(['conversation', response.conversationID]);

          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const serverResponse: IServerResponseSignUp = error.error;
          console.log(serverResponse.message);
          console.log(serverResponse.type);
          this.toastmessageService.showToastMessage(
            'Cretting new personal conversation failed: ' +
              serverResponse.message,
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
