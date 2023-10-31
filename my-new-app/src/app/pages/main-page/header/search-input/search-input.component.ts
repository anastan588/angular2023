import { Component} from '@angular/core';
import { OpenFilterMenuService } from 'src/app/core/services/open-filter/open-filter-menu.service';
import { ShowResultsService } from 'src/app/core/services/show-results/show-results.service';
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  open: boolean;
  results: true;
  constructor(private readonly openFilterMenuService: OpenFilterMenuService, private readonly showResultsService: ShowResultsService) {
    this.open = true;
    this.results = true;
  }
  toggleSorting() {
    console.log(this.open);
    this.openFilterMenuService.setOpenFilterMenu(this.open);
    this.open = !this.open;
  }
  showResults() {
    console.log(this.results);
    this.showResultsService.setShowResults(this.results);
  }
}
