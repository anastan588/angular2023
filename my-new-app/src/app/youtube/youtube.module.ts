import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YoutubeComponent } from './youtube.component';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderModule } from '../shared/components/header.module';
import { FooterComponent } from '../shared/components/footer/footer.component';

@NgModule({
  declarations: [YoutubeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    YoutubeRoutingModule,
    FooterComponent,
    HeaderModule,
  ],
  exports: [RouterModule],
  providers: [],
})
export class YoutubeModule {
  constructor() {
    console.log('youtube module');
  }
}
