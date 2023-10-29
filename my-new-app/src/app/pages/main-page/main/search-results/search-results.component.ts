import { Component } from '@angular/core';
import information from './../../../../core/store/data/response.json';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { SearchItemComponent } from '../search-item/search-item.component';
import { CommonModule } from '@angular/common';
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
