import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IGroupMessage } from 'src/app/core/models/groupMessages';
import { IPerson } from 'src/app/core/models/peoples';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.scss'],
})
export class GroupMessageComponent implements OnInit {
  @Input() message!: IGroupMessage;
  @Input() userMessageName!: string;
  
  constructor(private store: Store) {}
  ngOnInit(): void {
    console.log(this.userMessageName);
    
  }
}
