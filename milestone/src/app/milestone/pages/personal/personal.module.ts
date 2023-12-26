import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalMessageComponent } from './personal-message/personal-message.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared';

@NgModule({
  declarations: [PersonalComponent, PersonalMessageComponent],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
})
export class PersonalModule {}
