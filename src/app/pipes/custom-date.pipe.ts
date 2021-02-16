import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, args?: any): String {
    let custom = new Date(value);
    return custom.toLocaleDateString();
  }

}
