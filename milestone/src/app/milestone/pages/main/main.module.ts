import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MatGridTile } from '@angular/material/grid-list';
import { GroupItemComponent } from './group-item/group-item.component';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, MainRoutingModule, MaterialModule],
  exports: [],
})
export class MainModule {}
