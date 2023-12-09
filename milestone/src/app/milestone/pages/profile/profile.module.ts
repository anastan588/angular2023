import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ButtonComponent } from 'src/app/shared';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    ButtonComponent,
  ],
})
export class ProfileModule {}
