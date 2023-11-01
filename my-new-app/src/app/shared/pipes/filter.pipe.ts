import { Pipe, PipeTransform } from '@angular/core';
import { IVideoItem } from 'src/app/core/store/models/video-item';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(searchResults: IVideoItem[], value: string) {
    console.log(searchResults);
    console.log(value);
    const pureValue = value.trim().toLowerCase();''
    let results;
    results = searchResults.filter(video => {
      let preResults = video.snippet.tags?.map(tag => {
          const resultTag = tag.includes(pureValue);
          return resultTag;
        });
        if(preResults?.find(item=> item === true)) {
          return true;
        } else {
          return false;
        }
      });  
    return results;
  }
}
