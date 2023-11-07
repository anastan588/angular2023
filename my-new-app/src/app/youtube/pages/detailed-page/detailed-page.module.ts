import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { DetailedRoutingModule } from './detailed-page-routing.module';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderModule } from '../../components/header.module';
import { DetailedPageComponent } from './detailed-page.component';


@NgModule({
  declarations: [DetailedPageComponent],
  imports: [
    CommonModule,
    MatCardModule, 
    RouterModule,
    DetailedRoutingModule,
  ]
})
export class DetailedPageModule { }
