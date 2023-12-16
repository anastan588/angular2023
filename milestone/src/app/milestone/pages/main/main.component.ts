import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IGroup } from 'src/app/core/models/groups';
import { GroupsService } from 'src/app/core/services/groups/groups.service';
import {
  loadMilestoneGroups,
  startGroupTimer,
} from 'src/app/core/store/milestone/milestone.actions';
import {
  selectGroups,
  selectGruopsUpdateTime,
} from 'src/app/core/store/milestone/milestone.selectors';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  DialogCreateGroupComponent,
} from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  groups$!: Array<IGroup>;
  currentGroup!: IGroup;
  userID!: string;
  timeUpdateGroupsTimer!: number;
  clickOnUpdateButton!: boolean;
  constructor(
    private groupsService: GroupsService,
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.store.dispatch(loadMilestoneGroups());
    console.log('groups service');
    this.store.select(selectGroups).subscribe(value => {
      this.groups$ = value;
    });
    this.store
      .select(selectGruopsUpdateTime)
      .subscribe(value => (this.timeUpdateGroupsTimer = value));
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
    this.clickOnUpdateButton = true;
    this.timeUpdateGroupsTimer = 59;
    this.store.dispatch(startGroupTimer());
    this.groupsService.clickOnUpdateButtonObject$.next(this.clickOnUpdateButton);
    this.store.dispatch(loadMilestoneGroups());
    this.clickOnUpdateButton = false;
    this.groupsService.clickOnUpdateButtonObject$.next(this.clickOnUpdateButton);
  }
  
}
