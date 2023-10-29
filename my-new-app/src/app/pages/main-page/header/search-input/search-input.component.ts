import { Component, OnInit } from '@angular/core';
import { OpenFilterMenuService } from 'src/app/core/services/open-filter-menu.service';
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [OpenFilterMenuService],
})
export class SearchInputComponent implements OnInit {
  openSortingMenu: boolean = false;
  constructor(private readonly openFilterMenuService: OpenFilterMenuService) {}
  ngOnInit(): void {
    console.log(this.openFilterMenuService.openFilterMenu);
    this.openSortingMenu = this.openFilterMenuService.openFilterMenu;
  }
  toggleSorting() {
    this.openFilterMenuService.openFilterMenu = this.openFilterMenuService.toggleSorting();
    console.log(this.openFilterMenuService.openFilterMenu);
    return this.openFilterMenuService.openFilterMenu;
  }
}
