import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule } from '@angular/router';
import { NotFoundRoutingModule } from './not-found-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundPageModule { }
