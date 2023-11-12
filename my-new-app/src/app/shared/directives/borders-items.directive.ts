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
  colors = {
    red: '#cf222e',
    yellow: '#d4a72c',
    green: '#2da44e',
    blue: '#218bff',
  };
  
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    
  }

  ngOnInit()  {
    const backgroundColor = this.getBackroundColor(this.video.snippet!.publishedAt);
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background',
      backgroundColor
    );
  }

  private getBackroundColor(date: string): string {
    const todayDate = new Date();
    const dataPublication = new Date(date);
    const timePublication = todayDate.getTime() - dataPublication.getTime();
    const days = timePublication / (1000 * 60 * 60 * 24);
    if (days > 180) {
      return this.colors.red;
    } else if (days <= 180 && days > 30) {
      return this.colors.yellow;
    } else if (days <= 30 && days >= 7) {
      return this.colors.green;
    } else if (days <= 7 && days >= 0) {
      return this.colors.blue;
    }
    return this.colors.red;
  }
}
