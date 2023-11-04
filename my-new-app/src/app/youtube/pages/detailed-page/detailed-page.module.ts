import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedPageComponent } from './detailed-page.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [DetailedPageComponent],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class DetailedPageModule { }
