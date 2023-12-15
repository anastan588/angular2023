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
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  groups$!: Array<IGroup>;
  constructor(
    private groupsService: GroupsService,
    private store: Store,
    public dialog: MatDialog
  ) {
   
  }
  ngOnInit(): void {
    this.store.dispatch(loadMilestoneGroups());
    console.log('groups service');
    this.store.select(selectGroups).subscribe(value=> {
      this.groups$ = value;
    })
  }

  openCreationGroupForm() {
    
  }
}
