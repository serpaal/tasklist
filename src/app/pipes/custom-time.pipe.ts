import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTime'
})
export class CustomTimePipe implements PipeTransform {

  transform(value: any, args?: any): String {
    let custom = new Date(value);
    let hour = custom.toLocaleTimeString().split(':');
    return hour[0] + ':' + hour[1];
  }

}
