import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MatGridTile } from '@angular/material/grid-list';

@NgModule({
  declarations: [],
  imports: [CommonModule, MainRoutingModule, MaterialModule],
})
export class MainModule {}
