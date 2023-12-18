import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGroupMessage } from 'src/app/core/models/groupMessages';
import { IPerson } from 'src/app/core/models/peoples';
import { GroupDialogService } from 'src/app/core/services/group-dialog/group-dialog.service';
import { selectPeoples } from 'src/app/core/store/milestone/milestone.selectors';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.scss'],
})
export class GroupMessageComponent implements OnInit {
  @Input() message!: IGroupMessage;
  userMessageName!: string;
  listUsers!: IPerson[];
  listUsersObservable!: Observable<IPerson[]>
  constructor(
    private store: Store,
    private groupDialogService: GroupDialogService
  ) {}
  ngOnInit() {
    this.store.select(selectPeoples).subscribe((items) => {
      items.forEach((item) => {
        if (item.uid.S === this.message.authorID.S) {
          this.userMessageName = item.name.S;
          console.log(this.userMessageName);
        }
      });
    });
    
  }
}
