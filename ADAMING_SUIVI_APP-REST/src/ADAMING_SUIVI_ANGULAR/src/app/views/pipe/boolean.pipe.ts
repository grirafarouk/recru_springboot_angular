import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: Boolean, args?: any): any {
    if (value === true) return 'oui';
    return 'non';
  }

}
