import { Component } from '@angular/core';
import information from './../../../../core/store/data/response.json';
import { IVideoItem } from 'src/app/core/store/models/video-item';

console.log(information);
console.log(information.items);
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  searchResults: IVideoItem[] = information.items;
}
