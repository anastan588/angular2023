import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { GroupMessageComponent } from './group-message/group-message.component';



@NgModule({
  declarations: [
    GroupComponent,
    GroupMessageComponent,
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MaterialModule,
  ],
  exports:[GroupComponent],
})
export class GroupModule { }
