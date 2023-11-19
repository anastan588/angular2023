import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BordersItemsDirective } from './directives/borders-items.directive';
import { SortingPipe } from './pipes/sorting.pipe';
import { ButtonModule } from './components/button/button.module';
import { InputComponent } from './components/input/input.component';
import { FilterPipe } from './pipes/filter.pipe';
import { HeaderModule } from './components/header.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BordersItemsDirective,
    ButtonModule,
    InputComponent,
    HeaderModule,
  ],
  exports: [
    BordersItemsDirective,
    InputComponent,
    ButtonModule,
    HeaderModule,
  ],
})
export class SharedModule {}
