import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';
import { FiltersService } from 'src/app/core/services/filters/filters.service';
import { IVideoItem } from 'src/app/core/store/models/video-item';

@Directive({
  selector: '[appBordersItems]',
  standalone: true,
})
export class BordersItemsDirective {
  @Input()
  video!: IVideoItem;
  dataPublication!: Date;
  timePublication!: number;
  todayDate: Date;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private readonly filterService: FiltersService
  ) {
    this.dataPublication;
    this.timePublication;
    this.todayDate = new Date();
    console.log(this.video);
  }

  ngOnInit(): void {
    console.log(this.video);
    console.log(this.video.snippet.publishedAt);
    this.dataPublication = new Date(this.video.snippet.publishedAt);
    this.timePublication =
      this.todayDate.getTime() - this.dataPublication.getTime();
    const days = this.timePublication / (1000 * 60 * 60 * 24);
    if (days > 180) {
      return this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background',
        '#cf222e'
      );
    } else if (days <= 180 && days > 30) {
      return this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background',
        ' #d4a72c'
      );
    } else if (days <= 30 && days >= 7) {
      return this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background',
        '#2da44e'
      );
    } else if (days <= 7 && days >= 0) {
      return this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background',
        '#218bff'
      );
    }
    return this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background',
      '#cf222e'
    );
  }
}
