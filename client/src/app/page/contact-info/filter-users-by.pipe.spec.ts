import { FilterUsersByPipe } from './filter-users-by.pipe';

describe('FilterUsersByPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterUsersByPipe();
    expect(pipe).toBeTruthy();
  });
});
