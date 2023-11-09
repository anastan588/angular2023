import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OpenFilterMenuService } from 'src/app/core/services/open-filter/open-filter-menu.service';
import { SearchInputComponent } from './search-input/search-input.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements DoCheck{
  isMenuOpen = false;

  constructor(public readonly openFilterMenuService: OpenFilterMenuService) {
  }
  ngDoCheck() {
      this.isMenuOpen = this.openFilterMenuService.openFilterMenu.valueOf();
    };
}
