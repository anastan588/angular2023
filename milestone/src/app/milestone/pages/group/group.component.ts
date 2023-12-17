import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IGroupMessage } from 'src/app/core/models/groupMessages';
import { IGroup } from 'src/app/core/models/groups';
import { IPerson } from 'src/app/core/models/peoples';
import { IServerResponseSignIn } from 'src/app/core/models/serverresponse';
import { IUser } from 'src/app/core/models/user';
import { GroupDialogService } from 'src/app/core/services/group-dialog/group-dialog.service';
import {
  loadMilestoneCurrentGroupForConversationSuccess,
  loadMilestoneGroupMessages,
} from 'src/app/core/store/milestone/milestone.actions';
import {
  selectCurrentGroupForConversation,
  selectGroupMessages,
  selectPeoples,
  selectUser,
} from 'src/app/core/store/milestone/milestone.selectors';
import { GroupMessageComponent } from './group-message/group-message.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  @ViewChild('groupMessage', { static: false }) groupMessage!: GroupMessageComponent;
  messageItem!: IGroupMessage;
  currentGroup!: IGroup;
  currentUser!: IServerResponseSignIn;
  listUsers!: IPerson[];
  userMessageName!: string;
  isCurrentUserGroup!: boolean;
  groupMessages$!: Observable<IGroupMessage[]>;
  sortedGroupMessages!: Observable<IGroupMessage[]>;
  constructor(
    private groupDialogService: GroupDialogService,
    private store: Store,
    private router: Router
  ) {this.listUsers=[]}

  ngOnInit(): void {
    this.store.dispatch(loadMilestoneGroupMessages());
    this.store.select(selectCurrentGroupForConversation).subscribe(value => {
      this.currentGroup = value;
    });
    const user = localStorage.getItem('user');
    this.currentUser = user ? JSON.parse(user) : null;
    console.log(this.currentUser);
    console.log(this.currentGroup.createdBy.S);
    if (this.currentGroup.createdBy.S === this.currentUser.uid) {
      this.isCurrentUserGroup = true;
      console.log(this.isCurrentUserGroup);
    }
    this.store
      .select(selectPeoples)
      .subscribe(value => (this.listUsers = value));
  
      
    this.messageItem = this.groupMessage.message;
    console.log(this.messageItem);
    
    for (let key of this.listUsers) {
      console.log(this.messageItem.authorID.S);
      if (key.uid.S === this.messageItem.authorID.S) {
        this.userMessageName = key.name.S;
      }
    }
    this.groupMessages$ = this.store.select(selectGroupMessages);
    this.sortedGroupMessages = this.groupMessages$.pipe(
      map(groupMessages =>
        groupMessages.slice().sort((a, b) => {
          const dateA = Number(a.createdAt.S);
          const dateB = Number(b.createdAt.S);
          return dateA - dateB;
        })
      )
    );
    console.log(this.sortedGroupMessages);
  }

  redirectToMain() {
    this.router.navigate(['/']);
  }
}
