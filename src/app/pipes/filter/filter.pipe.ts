import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items || !value || !field) {
      return items;
    }
    return items.filter(
      it => it[field].toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

}
