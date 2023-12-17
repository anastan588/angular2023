import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IGroup } from 'src/app/core/models/groups';
import { GroupsService } from 'src/app/core/services/groups/groups.service';
import {
  loadMilestoneGroups,
  loadMilestoneUsers,
  startGroupTimer,
  startPeoplesTimer,
} from 'src/app/core/store/milestone/milestone.actions';
import {
  selectConversations,
  selectGroups,
  selectGruopsUpdateTime,
  selectPeoples,
  selectPeoplesUpdateTime,
} from 'src/app/core/store/milestone/milestone.selectors';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogCreateGroupComponent } from 'src/app/shared';
import { Router } from '@angular/router';
import { IPerson } from 'src/app/core/models/peoples';
import { PeoplesService } from 'src/app/core/services/peoples/peoples.service';
import { IConversation } from 'src/app/core/models/conversations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  groups$!: Array<IGroup>;
  people$!: Array<IPerson>;
  currentGroup!: IGroup;
  userID!: string;
  timeUpdateGroupsTimer!: number;
  clickOnUpdateButtonGroups!: boolean;
  timeUpdatePeopleTimer!: number;
  clickOnUpdateButtonPeople!: boolean;
  conversationsUser!: IConversation[];

  constructor(
    private groupsService: GroupsService,
    private peopleService: PeoplesService,
    private store: Store,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.store.dispatch(loadMilestoneGroups());
    this.store.dispatch(loadMilestoneUsers());
    console.log('groups service');
    this.store.select(selectGroups).subscribe(value => {
      this.groups$ = value;
    });
    this.store
      .select(selectGruopsUpdateTime)
      .subscribe(value => (this.timeUpdateGroupsTimer = value));
    this.store.select(selectPeoples).subscribe(value => {
      this.people$ = value;
    });
    this.store
      .select(selectPeoplesUpdateTime)
      .subscribe(value => (this.timeUpdatePeopleTimer = value));
      this.store.select(selectConversations).subscribe(value => {
        this.conversationsUser = value;
        console.log(this.conversationsUser);
      });
  }

  openCreationGroupForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '50vw';
    const dialogRef = this.dialog.open(
      DialogCreateGroupComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog creation was closed');
    });
  }

  startTimerAndUpdateGroups() {
    this.clickOnUpdateButtonGroups = true;
    this.timeUpdateGroupsTimer = 59;
    this.store.dispatch(startGroupTimer());
    this.groupsService.clickOnUpdateButtonObject$.next(
      this.clickOnUpdateButtonGroups
    );
    this.store.dispatch(loadMilestoneGroups());
    this.clickOnUpdateButtonGroups = false;
    this.groupsService.clickOnUpdateButtonObject$.next(
      this.clickOnUpdateButtonGroups
    );
  }

  startTimerAndUpdatePeople() {
    this.clickOnUpdateButtonPeople = true;
    this.timeUpdatePeopleTimer = 59;
    this.store.dispatch(startPeoplesTimer());
    this.peopleService.clickOnUpdateButtonObject$.next(
      this.clickOnUpdateButtonPeople
    );
    this.store.dispatch(loadMilestoneUsers());
    this.clickOnUpdateButtonPeople = false;
    this.peopleService.clickOnUpdateButtonObject$.next(
      this.clickOnUpdateButtonPeople
    );
  }
}
