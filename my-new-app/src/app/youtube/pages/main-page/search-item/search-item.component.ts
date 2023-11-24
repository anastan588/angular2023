import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Store } from '@ngrx/store';
import { FavouriteVideosActions } from 'src/app/core/store/actions/actions';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() selected!: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Input()
  video!: IVideoItem;
  dataPublication!: Date;
  timePublication!: number;
  todayDate: Date;
  colorOfFooter: Record<string, string> = {};
  constructor(
    private router: Router,
    private apiServise: ApiService,
    private store: Store
  ) {
    this.dataPublication;
    this.timePublication;
    this.todayDate = new Date();
    this.colorOfFooter = {};
    this.selected = true;
  }

  navigateToDetailedPage() {
    this.router.navigate(['main/detailed', this.video.id]);
  }

  addtoFavourite() {}

  public toggleSelected(videoId: string) {
    this.selected = !this.selected;
    console.log(this.selected);
    this.selectedChange.emit(this.selected);
    if (this.selected === true) {
      this.store.dispatch(FavouriteVideosActions.addFavourite({ videoId }));
    } else {
      this.store.dispatch(FavouriteVideosActions.removeFavourite({ videoId }));
    }
    
  }
  }
    
