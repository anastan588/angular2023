import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
  ],
  imports: [CommonModule, MainRoutingModule, MaterialModule],
  exports: [],
})
export class MainModule {}
