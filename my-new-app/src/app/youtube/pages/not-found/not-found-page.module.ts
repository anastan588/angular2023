import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule } from '@angular/router';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderModule } from '../../components/header.module';
import { NotFoundPageComponent } from './not-found-page.component';



@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    NotFoundRoutingModule,
    HeaderModule,
    FooterComponent
  ]
})
export class NotFoundPageModule { }
