import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
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
  event!: Event;
  isSearchWord: string;

  constructor(
    private readonly openFilterMenuService: OpenFilterMenuService,
    private readonly showResultsService: ShowResultsService,
    private readonly apiService: ApiService,
    private router: Router
  ) {
    this.open = true;
    this.results = true;
    this.isSearchWord = '';
  }
  toggleSorting() {
    this.openFilterMenuService.setOpenFilterMenu(this.open);
    this.open = !this.open;
  }
  showResults() {
    this.router.navigate(['main']);
    this.apiService.getVideosFromYouTubeApi();
  }
  changeSearchWord() {
    console.log(this.isSearchWord);
    this.apiService.changeSearchWord(this.isSearchWord);
  }
}
