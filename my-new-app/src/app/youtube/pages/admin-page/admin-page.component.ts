import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { IVideoItem } from 'src/app/core/data/models/video-item';
import { CustomVideosActions } from 'src/app/core/store/youtube/youtube.actions';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  adminForm = this.fb.group({
    title: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      },
    ],
    description: [
      '',
      {
        validators: [Validators.maxLength(255)],
      },
    ],
    link: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    date: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    tags: new FormArray([new FormControl('', Validators.required)]),
  });

  minDate: Date;
  maxDate: Date;

  constructor(
    private readonly authService: AuthService,
    private fb: FormBuilder,
    private store: Store
  ) {
    const currentDate = new Date();
    this.minDate = new Date(1923, 0, 1, 0, 0, 0, 0);
    this.maxDate = new Date(currentDate);
  }

  admin(): IVideoItem {
    const admin: IVideoItem = {
      id: {
        videoId: String(Math.floor(Math.random() * 10)),
      },
      snippet: {
        publishedAt: this.adminForm.value.date!,
        title: this.adminForm.value.title!,
        description: this.adminForm.value.description!,
        tags: this.adminForm.value.tags as string[],
        thumbnails: {
          high: {
            url: this.adminForm.value.link!,
          },
          standard: {
            url: this.adminForm.value.link!,
          },
        },
      },
    };
    console.log(admin);
    return admin;
  }

  setAdminNewVideoToken() {
    const admin = this.admin();
    this.store.dispatch(CustomVideosActions.addVideo({ video: admin }));
    this.authService.setAdminToken(admin);
  }

  addTagField() {
    if (this.adminForm.controls['tags'].length < 5) {
      (<FormArray>this.adminForm.controls['tags']).push(
        new FormControl('', Validators.required)
      );
    }
  }
  getFormsTags(): FormArray {
    return this.adminForm.controls['tags'] as FormArray;
  }

  resetAdminForm() {
    while (this.adminForm.controls['tags'].length !== 1) {
      this.adminForm.controls['tags'].removeAt(0);
    }
    return this.adminForm.reset();
  }
}
