import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupDialogService {
  urlReceiveMessagesGroup: string
  constructor() {
    this.urlReceiveMessagesGroup = 'groups/read?groupID={:groupID}&since={:since}';
   }
}
