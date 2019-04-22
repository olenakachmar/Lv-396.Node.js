import { Pipe, PipeTransform } from '@angular/core';
import { Filter } from './common/filter';
import { Task } from './common/task';

@Pipe({
  name: 'filterTasksBy'
})
export class FilterTasksByPipe implements PipeTransform {

  transform(tasks: Task[], filters?: Filter[]): Task[] {
    console.log(tasks);
    if (!filters || this.isAllFiltersTurnedOff(filters)) {
      return tasks.filter(task => !(task.resolvedByAuthor && task.resolvedByPerformer));
    }

    return tasks.filter(task => this.isTaskMatchesFilters(task, filters));
  }

  private readonly isAllFiltersTurnedOff = (filters: Filter[]) =>
    filters.every(filter => filter.defaultValue === -1);

  private readonly isTaskMatchesFilters = (task: Task, filters: Filter[]) =>
    filters.every(filter => {
      if (filter.defaultValue === -1) {
        return true;
      }
      const meta = filter.name;
      if (meta === 'date') {
        return filter.defaultValue === task[meta];
      }

      if (meta === 'type' && filter.defaultValue === 2) {
        console.log(task.resolvedByAuthor && task.resolvedByPerformer);

        return task.resolvedByAuthor && task.resolvedByPerformer;
      }

      return filter.defaultValue === task[meta].value;
    });

}
