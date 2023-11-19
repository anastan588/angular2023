import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { IAdmin } from 'src/app/core/store/models/admin';

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
    private fb: FormBuilder
  ) {
    const currentDate = new Date();
    this.minDate = new Date(1923, 0, 1, 0, 0, 0, 0);
    this.maxDate = new Date(currentDate);
  }

  admin(): IAdmin {
    const admin: IAdmin = {
      title: this.adminForm.value.title!,
      description:  this.adminForm.value.description!,
      link:  this.adminForm.value.link!,
      date: this.adminForm.value.date!,
      tags: this.adminForm.value.tags!,
    };
    console.log(admin);
    return admin;
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

  get _tags() {
    return this.adminForm.controls['tags'].get('tag');
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

  getErrorMessageForTag(i: number) {
    if (this.adminForm.controls['tags'].controls[i].hasError('required')) {
      return 'Please enter a tag';
    }
    return;
  }
  setAdminNewVideoToken() {
    const admin = this.admin();
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

  isInvalidTag(i: number): boolean {
    console.log(this.adminForm.controls['tags'].controls[i]);
    return this.adminForm.controls['tags'].controls[i].hasError('required');
  }

  isTouchedTag(i: number): boolean {
    return this.adminForm.controls['tags'].controls[i].touched;
  }

  resetAdminForm() {
    while (this.adminForm.controls['tags'].length !== 1) {
      this.adminForm.controls['tags'].removeAt(0);
    }
    return this.adminForm.reset();
  }
}
