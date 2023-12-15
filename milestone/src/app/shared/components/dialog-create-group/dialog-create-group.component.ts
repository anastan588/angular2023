import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-create-group',
  templateUrl: './dialog-create-group.component.html',
  styleUrls: ['./dialog-create-group.component.scss'],
})
export class DialogCreateGroupComponent {
  groupForm = this.fb.group({
    name: [
      '',
      {
        validators: [Validators.required, Validators.maxLength(30)],
      },
    ],
  });
  constructor(private fb: FormBuilder) {}
  onCancel() {}
}
