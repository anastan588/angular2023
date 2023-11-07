import { Pipe, PipeTransform } from '@angular/core';
import { IVideoItem } from 'src/app/core/store/models/video-item';

@Pipe({
  name: 'sorting',
  pure: false
})
export class SortingPipe implements PipeTransform {

  transform(searchResults: IVideoItem[], isDateSort: string, isViewSort: string, initialArrayResults: IVideoItem): unknown {
   
  if (isDateSort !== 'none') {
      searchResults.sort((first: IVideoItem, second: IVideoItem) => {
        const firstDate = Date.parse(first.snippet.publishedAt);
        const secondDate = Date.parse(second.snippet.publishedAt);
        return this.sortArray(firstDate, secondDate, isDateSort);
      });
    } else {
      // searchResults = JSON.parse(JSON.stringify(searchResults));
    }

    if (isViewSort !== 'none') {
      searchResults.sort((first: IVideoItem, second: IVideoItem) => {
        const firstView = Number(first.statistics.viewCount);
        const secondView = Number(second.statistics.viewCount);
        return this.sortArray(firstView, secondView, isViewSort);
      });
    } else {
      // return searchResults = JSON.parse(JSON.stringify(initialArrayResults));
    }
    console.log(searchResults);
    return searchResults;
  }

  sortArray(a: number, b: number, state: string) {
    if (state === 'ascending') {
      return a - b;
    } else {
      return b - a;
    }
  }

}
