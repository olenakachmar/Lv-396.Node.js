import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'filterTasksBy'
})
export class FilterForTasksPipe implements PipeTransform {
  transform(value: any, filters?: any): any {
    return (!filters || filters.filter(filter => filter.defaultValue === -1).length === filters.length) ? value : value.filter(
      item => filters.length === filters.filter(
        filter => (filter.defaultValue === -1 || filter.defaultValue === item[filter.name].value) ).length );
  }
}
