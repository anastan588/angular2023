import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { OpenFilterMenuService } from 'src/app/core/services/open-filter-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [OpenFilterMenuService]
})
export class HeaderComponent implements OnChanges{
  open: boolean = false;
  constructor(private readonly openFilterMenuSetvice: OpenFilterMenuService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.open = this.openFilterMenuSetvice.openFilterMenu;
    console.log(this.open);
  }
 
}
