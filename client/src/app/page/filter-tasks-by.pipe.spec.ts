import { FilterTasksByPipe } from './filter-tasks-by.pipe';

describe('FilterTasksByPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterTasksByPipe();
    expect(pipe).toBeTruthy();
  });
});
