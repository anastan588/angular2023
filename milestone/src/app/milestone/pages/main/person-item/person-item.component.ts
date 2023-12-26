import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ICompanion,
  IConversation,
  ICreatePersonalConversationResponse,
} from 'src/app/core/models/conversations';
import { IPerson } from 'src/app/core/models/peoples';
import { ICurrentPersonalConversation } from 'src/app/core/models/visitedPersonalConversations';
import { PeoplesService } from 'src/app/core/services/peoples/peoples.service';
import { loadMilestoneCurrentPersonalConversationSuccess } from 'src/app/core/store/milestone/milestone.actions';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.scss'],
})
export class PersonItemComponent implements OnInit {
  @Input()
  currentPerson!: IPerson;
  currentConversation!: ICurrentPersonalConversation;
  userID!: string;
  @Input() conversations!: IConversation[];
  isConversationExist!: boolean;
  requestbodyForNewConversation: ICompanion;
  constructor(
    private store: Store,
    private router: Router,
    private peopleService: PeoplesService
  ) {
    this.requestbodyForNewConversation = {
      companion: '',
    };
    this.currentConversation = {
      conversationID: '',
      companionID: '',
    };
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userBody = user ? JSON.parse(user) : null;
    this.userID = userBody.uid;
    for (let key of this.conversations) {
      if (key.companionID.S === this.currentPerson.uid.S) {
        this.isConversationExist = true;
      }
    }
  }
  createConversationWithPerson() {
    this.requestbodyForNewConversation.companion = this.currentPerson.uid.S;
    console.log(this.isConversationExist);
    if (this.isConversationExist) {
      for (let key of this.conversations) {
        if (key.companionID.S === this.currentPerson.uid.S) {
          this.router.navigate(['conversation', key.id.S]),
            (this.currentConversation.companionID = key.companionID.S);
          this.currentConversation.conversationID = key.id.S;
        }
      }
      console.log(this.currentConversation);
      this.store.dispatch(
        loadMilestoneCurrentPersonalConversationSuccess({
          currentPersonalConversation: this.currentConversation,
        })
      );
    } else {
      this.peopleService.newCompanionConversationObject$.next(
        this.requestbodyForNewConversation
      );
      this.peopleService.createNewConversationWithPerson();
    }
  }
}
