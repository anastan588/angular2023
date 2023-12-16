import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatGridTile } from '@angular/material/grid-list';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGroup } from 'src/app/core/models/groups';
import { GroupsService } from 'src/app/core/services/groups/groups.service';
import { loadMilestoneGroups } from 'src/app/core/store/milestone/milestone.actions';
import { selectGroups } from 'src/app/core/store/milestone/milestone.selectors';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DialogCreateGroupComponent } from 'src/app/shared';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  groups$!: Array<IGroup>;
  userID!: string;

  constructor(
    private groupsService: GroupsService,
    private store: Store,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.store.dispatch(loadMilestoneGroups());
    console.log('groups service');
    this.store.select(selectGroups).subscribe(value => {
      this.groups$ = value;
    });
    const user = localStorage.getItem('user');
    console.log(user);
    const userBody = user ? JSON.parse(user) : null;
    this.userID = userBody.uid;
    console.log(this.userID);
    
  }

  openCreationGroupForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '50vw';
    const dialogRef = this.dialog.open(
      DialogCreateGroupComponent,
      dialogConfig
    );
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
