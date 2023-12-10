import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IServerResponseSignIn } from 'src/app/core/models/serverresponse';
import { IUser } from 'src/app/core/models/user';
import { IUserName } from 'src/app/core/models/userUpdate';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import {
  editUserName,
  loadMilestoneUser,
} from 'src/app/core/store/milestone/milestone.actions';
import { selectUser } from 'src/app/core/store/milestone/milestone.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: IUser;
  newName!: string;
  requestbodyForName!: IUserName;
  @Output() isEdit!: boolean;
  nameForm = this.fb.group({
    name: [
      '',
      {
        validators: [Validators.required],
      },
    ],
  });

  constructor(
    private profileService: ProfileService,
    private store: Store,
    private fb: FormBuilder
  ) {
    this.requestbodyForName = {
      name: '',
    };
  }

  ngOnInit(): void {
    this.isEdit = false;
    this.store.dispatch(loadMilestoneUser());
    this.store.select(selectUser).subscribe(value => {
      this.user = value;
      this.newName = value.name.S;
      console.log(this.user);
    });
  }

  makeEditMode() {
    return (this.isEdit = true);
  }
  cancelEditMode() {
    return (this.isEdit = false);
  }

  onChange() {
    console.log(this.newName);
    return this.newName;
  }
  saveChangesOfUserName() {
    console.log(this.newName);
    this.requestbodyForName.name = this.newName;
    this.profileService.requestBodyForService$.next(this.requestbodyForName);
    this.profileService.sentUsersNewData();
    this.store.dispatch(editUserName({ nameS: this.newName }));
    return this.isEdit = false;
  }
}
