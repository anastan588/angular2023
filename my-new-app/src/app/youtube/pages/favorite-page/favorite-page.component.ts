import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { IVideoItem } from 'src/app/core/store/models/video-item';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent {
  @Input() selected!: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Input() 
  video!: IVideoItem;
  dataPublication!: Date;
  timePublication!: number;
  todayDate: Date;
  colorOfFooter: Record<string, string> = {};
  searchResults$!:Observable<IVideoItem[]>;
  initialArray!: IVideoItem[];
  constructor(
    public router: Router,
    public readonly filterService: FiltersService,
    public readonly api: ApiService
  ) {
    this.dataPublication;
    this.timePublication;
    this.todayDate = new Date();
    this.colorOfFooter = {};
  }

  navigateToDetailedPage() {
    this.router.navigate(['main/detailed', this.video.id]);
  }

  addtoFavourite() {}

  public toggleSelected() {
    this.selected = !this.selected;
    console.log(this.selected);
    this.selectedChange.emit(this.selected);
  }

  ngOnInit() {
    this.searchResults$ = this.api.resultForCustomers$;
    this.api.resultForCustomers$.subscribe((data: IVideoItem[]) => {
      this.initialArray = JSON.parse(JSON.stringify(data));
    });
  }
}
