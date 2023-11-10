import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

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
    tags: new FormArray([new FormControl('',Validators.required )]),
  });

  minDate: Date;
  maxDate: Date;

  constructor(
    private readonly authService: AuthService,
    private fb: FormBuilder
  ) {
    const currentDate = new Date();
    this.minDate = new Date(1923, 0, 1, 0, 0, 0, 0);
    this.maxDate = new Date(currentDate);
  }

  get _title() {
    return this.adminForm.get('title');
  }

  get _description() {
    return this.adminForm.get('description');
  }

  get _link() {
    return this.adminForm.get('link');
  }

  get _date() {
    return this.adminForm.get('date');
  }

  get _i() {
    return this.adminForm.controls['tags'];
  }

  getErrorMessageForTitle() {
    if (this.adminForm.get('title')!.hasError('required')) {
      return 'Please enter a title';
    }
    if (this.adminForm.get('title')!.hasError('minLength')) {
      return 'The title length must be at least 3 characters';
    }
    if (this.adminForm.get('title')!.hasError('maxLength')) {
      return 'The title length must be max 20 characters';
    }
    return;
  }

  getErrorMessageForDescription() {
    if (this.adminForm.get('description')!.hasError('maxLength')) {
      return 'The description length must be max 255 characters';
    }
    return;
  }

  getErrorMessageForLink() {
    if (this.adminForm.get('link')!.hasError('required')) {
      return 'Please enter a link to the image';
    }
    return;
  }

  getErrorMessageForDate() {
    if (this.adminForm.get('date')!.hasError('required')) {
      return 'Please enter a creation date';
    }
    return;
  }

  getErrorMessageForTag() {
    if (this.adminForm.controls['tags'].get('tag')!.hasError('required')) {
      return 'Please enter a tag';
    }
    return;
  }
  setAdminNewVideoToken() {
    const title = this.adminForm.get('title')!.value;
    const description = this.adminForm.get('description')!.value;
    const link = this.adminForm.get('link')!.value;
    const date = this.adminForm.get('date')!.value;
    this.authService.setLoginAndPassword(title!, description!);
  }

  addTagField() {
    (<FormArray>this.adminForm.controls['tags']).push(
      new FormControl('', Validators.required)
    );
  }
  getFormsTags(): FormArray {
    return this.adminForm.controls['tags'] as FormArray;
  }
}
