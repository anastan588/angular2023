import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IID, IVideoItem } from 'src/app/core/data/models/video-item';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Store } from '@ngrx/store';
import {
  addFavoriteVideo,
  removeCustomVideo,
  removeFavoriteVideo,
} from 'src/app/core/store/youtube/youtube.actions';
import { selectfavouriteCollection, selectfavouriteCollectionState } from 'src/app/core/store/youtube/youtube.selectors';


@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit{
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
    this.selected = false;
  }
 ngOnInit(): void {
   this.store.select(selectfavouriteCollectionState)
   .subscribe(data=> {
    const isFavourite = data.find((item) => {
      const ID = JSON.parse(JSON.stringify(this.video.id));
      return item === ID;
    });
      if (isFavourite !== undefined) {
        this.selected = true;
      }
   })
 }
  navigateToDetailedPage() {
    this.router.navigate(['main/detailed', this.video.id]);
  }
  deleteCustomCard() {
    this.store.dispatch(
      removeCustomVideo({ video: this.video})
    );
  }

  public toggleSelected(event$: Event) {
    event$.stopPropagation();
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
    const ID = this.video.id;
    if (this.selected === true) {
      this.store.dispatch(
        addFavoriteVideo({ videoId: `${ID}` })
      );
    } else {
      this.store.dispatch(
        removeFavoriteVideo({
          videoId: `${ID}`,
        })
      );
    }
  }
}
