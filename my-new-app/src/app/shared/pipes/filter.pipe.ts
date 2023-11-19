import { Pipe, PipeTransform } from '@angular/core';
import { IVideoItem } from 'src/app/core/store/models/video-item';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(searchResults$: IVideoItem[], value: string): IVideoItem[] {
    const pureValue = value.trim().toLowerCase();
    if (value !== undefined && value !== '') {
      let results;
      results = searchResults$.filter(video => {
        let preResults = video.snippet.tags?.map(tag => {
          const resultTag = tag.includes(pureValue);
          return resultTag;
        });
        if (preResults?.find(item => item === true)) {
          return true;
        } else {
          return false;
        }
      });
      searchResults$ = results;
    }
    return searchResults$;
  }
}
