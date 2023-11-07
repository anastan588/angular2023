import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { DetailedRoutingModule } from './detailed-page-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule, 
    RouterModule,
    DetailedRoutingModule
  ]
})
export class DetailedPageModule { }
