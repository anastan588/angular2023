import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundPageComponent } from './not-found-page.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { HeaderModule } from 'src/app/shared/components/header.module';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    NotFoundRoutingModule,
    HeaderModule,FooterComponent
  ]
})
export class NotFoundPageModule { }
