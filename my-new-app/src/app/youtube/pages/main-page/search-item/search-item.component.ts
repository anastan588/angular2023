import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IVideoItem } from 'src/app/core/store/models/video-item';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

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
  constructor(private router: Router) {
    this.dataPublication;
    this.timePublication;
    this.todayDate = new Date();
    this.colorOfFooter = {};
  }

  navigateToDetailedPage() {
    this.router.navigate(['main/detailed', this.video.id]);
  }

  addtoFavourite() {

  }

  public toggleSelected() {
    this.selected = !this.selected;
    console.log(this.selected);
    this.selectedChange.emit(this.selected);
  }
}
