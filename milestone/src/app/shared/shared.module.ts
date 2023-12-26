import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './index';
import * as Shared from './index';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogDeleteConversationComponent } from './components/dialog-delete-conversation/dialog-delete-conversation.component';

@NgModule({
  declarations: [
    Shared.DialogCreateGroupComponent,
    Shared.DialogDeleteGroupComponent,
    DialogDeleteConversationComponent,
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
