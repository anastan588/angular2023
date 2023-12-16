import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './index';
import * as Shared from './index';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Shared.DialogCreateGroupComponent,
    Shared.DialogDeleteGroupComponent,
  ],
  imports: [
    CommonModule,
    ButtonComponent,
    Shared.NotFoundModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
