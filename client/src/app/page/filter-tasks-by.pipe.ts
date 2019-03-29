import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTasksBy'
})
export class FilterTasksByPipe implements PipeTransform {

  transform(value: any, filters?: any): any {
    return (!filters || !filters.filter(f => f.defaultValue > -1).length) ? value : value.filter(
        item => !filters.filter( f => (f.defaultValue > -1 && f.defaultValue !== item[f.name].value) ).length );
  }

}
