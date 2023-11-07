import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BordersItemsDirective } from './directives/borders-items.directive';
import { SortingPipe } from './pipes/sorting.pipe';

@NgModule({
  declarations: [
  ],
  imports: [CommonModule, BordersItemsDirective],
  exports: [BordersItemsDirective],
})
export class SharedModule {}
