import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(it => {     
      if(it.description.toLocaleLowerCase().includes(searchText))
        return it;
      if(it.title.toLocaleLowerCase().includes(searchText))
        return it;
    });
  }

}
