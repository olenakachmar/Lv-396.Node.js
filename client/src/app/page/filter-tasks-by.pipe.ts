import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTasksBy'
})
export class FilterTasksByPipe implements PipeTransform {

  transform(value: any, filters?: any): any {
    return (!filters || filters.every(f => f.defaultValue === -1)) ? value : value.filter(
        item => filters.every( f => f.defaultValue === -1 || f.defaultValue === item[f.name].value) );
  }

}
