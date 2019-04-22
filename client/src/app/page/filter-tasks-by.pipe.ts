import { Pipe, PipeTransform } from '@angular/core';
import { Filter } from './common/filter';
import { Task } from './common/task';
import { DateService } from './common/date.service';

@Pipe({
  name: 'filterTasksBy'
})
export class FilterTasksByPipe implements PipeTransform {
  constructor(
    private readonly dateService: DateService) {}

  transform(tasks: Task[], filters?: Filter[]): Task[] {
    if (!filters || this.isAllFiltersTurnedOff(filters)) {
      return tasks;
    }

    return tasks.filter(task => this.isTaskMatchesFilters(task, filters));
  }

  private readonly isAllFiltersTurnedOff = (filters: Filter[]) =>
    filters.every(filter => filter.defaultValue === -1);

  private readonly isTaskMatchesFilters = (task: Task, filters: Filter[]): boolean =>
    filters.every(filter => {
      if (filter.defaultValue === -1) {
        return true;
      }
      const meta: string = filter.name;
      if (meta === 'date') {
        const date = (this.dateService.isDateString(task[meta])) ?
          this.dateService.convertStringToDate(task[meta]) :
          new Date(task[meta]);

        return this.dateService.convertStringToDate(filter.defaultValue)
          .getTime() === date.getTime();
      }

      return filter.defaultValue === task[meta].value;
    });

}
