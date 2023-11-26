import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { selectfavouriteCollection } from 'src/app/core/store/selectors/selectors';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss']
})
export class FavoriteItemComponent {
  @Input() selected!: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  video!: IVideoItem;
  dataPublication!: Date;
  timePublication!: number;
  todayDate: Date;
  colorOfFooter: Record<string, string> = {};
  initialArray!: IVideoItem[];
  constructor(
    public router: Router,
    public readonly filterService: FilterPipe,
    public readonly api:ApiService,
    private store: Store
  ) {
    this.dataPublication;
    this.timePublication;
    this.todayDate = new Date();
    this.colorOfFooter = {};
    this.selected = true;
  }

  navigateToDetailedPage() {
    console.log(this.video.id);
    this.router.navigate(['main/detailed', this.video.id]);
  }

  public toggleSelected() {
    this.selected = !this.selected;
    console.log(this.selected);
    console.log(this.video)
    this.selectedChange.emit(this.selected);
  }

  ngOnInit() {
    // this.searchResults$ = this.api.resultForCustomers$;
    // this.api.resultForCustomers$.subscribe((data: IVideoItem[]) => {
    //   this.initialArray = JSON.parse(JSON.stringify(data));
    // });
  }
}
