import { Pipe, PipeTransform } from '@angular/core';
import { Filter } from './common/filter';
import { Task } from './common/task';

@Pipe({
  name: 'filterTasksBy'
})
export class FilterTasksByPipe implements PipeTransform {

  transform(tasks: Task[], filters?: Filter[]): Task[] {
    return (!filters || filters.every(f => f.defaultValue === -1)) ? tasks : tasks.filter(
      task => this.isTaskMatchesFilters(task, filters));
  }

  isTaskMatchesFilters = (task: any, filters: Filter[]) => {
    return filters.every( filter => {
      let result = false;
      if (filter.defaultValue === -1) {
        result = true;
      } else {
        const meta = filter.name;
        if (meta === 'date') {
          result = (filter.defaultValue === task[meta]) ? true : false;
        } else {
          result = (filter.defaultValue === task[meta].value) ? true : false;
        }
      }
      return result;
    });
  }

}
