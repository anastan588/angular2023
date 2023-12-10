import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './index';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundModule } from './pages/not-found/not-found.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonComponent, NotFoundModule],
})
export class SharedModule {}
