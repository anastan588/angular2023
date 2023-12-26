import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPerson } from 'src/app/core/models/peoples';
import { IPersonMessage } from 'src/app/core/models/personMessages';
import { PersonalConversationService } from 'src/app/core/services/personal-conversation/personal-conversation.service';
import { selectPeoples } from 'src/app/core/store/milestone/milestone.selectors';

@Component({
  selector: 'app-personal-message',
  templateUrl: './personal-message.component.html',
  styleUrls: ['./personal-message.component.scss']
})
export class PersonalMessageComponent {
  @Input() message!: IPersonMessage;
  userMessageName!: string;
  listUsers!: IPerson[];
  listUsersObservable!: Observable<IPerson[]>
  constructor(
    private store: Store,
    private personalCoversationService: PersonalConversationService
  ) {}
  ngOnInit() {
    this.store.select(selectPeoples).subscribe((items) => {
      items.forEach((item) => {
        if (item.uid.S === this.message.authorID.S) {
          this.userMessageName = item.name.S;
        }
      });
    });
    
  }
}
