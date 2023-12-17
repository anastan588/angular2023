import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICompanion, IConversation } from 'src/app/core/models/conversations';
import { IPerson } from 'src/app/core/models/peoples';
import { PeoplesService } from 'src/app/core/services/peoples/peoples.service';
import { selectConversations } from 'src/app/core/store/milestone/milestone.selectors';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.scss'],
})
export class PersonItemComponent implements OnInit {
  @Input()
  currentPerson!: IPerson;
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
    if (this.isConversationExist) {
      for (let key of this.conversations) {
        if (key.companionID.S === this.currentPerson.uid.S) {
          this.router.navigate(['conversation', key.id.S]);
        }
      }
    } else {
      this.peopleService.newCompanionConversationObject$.next(
        this.requestbodyForNewConversation
      );
      this.peopleService.createNewConversationWithPerson();
    }
  }
}
