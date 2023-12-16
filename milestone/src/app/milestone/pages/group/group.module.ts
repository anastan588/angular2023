import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';



@NgModule({
  declarations: [
    GroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule
  ],
  exports:[GroupComponent],
})
export class GroupModule { }
