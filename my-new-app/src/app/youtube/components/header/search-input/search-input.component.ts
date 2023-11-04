import { Component} from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private readonly openFilterMenuService: OpenFilterMenuService, private readonly showResultsService: ShowResultsService, private router: Router) {
    this.open = true;
    this.results = true;
  }
  toggleSorting() {
    this.openFilterMenuService.setOpenFilterMenu(this.open);
    this.open = !this.open;
  }
  showResults() {
    this.router.navigate(['main']);
    this.showResultsService.setShowResults(this.results);
  }
}
