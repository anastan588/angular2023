import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IServerResponseSignIn } from 'src/app/core/models/serverresponse';
import { IUser } from 'src/app/core/models/user';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { loadMilestoneUser } from 'src/app/core/store/milestone/milestone.actions';
import { selectUser } from 'src/app/core/store/milestone/milestone.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: IUser;
  constructor(
    private profileService: ProfileService,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.store.dispatch(loadMilestoneUser());
    this.store.select(selectUser).subscribe(value => {
      this.user = value;
      console.log(this.user)
    });
    // this.profileService.getUsersData();
  }
}
