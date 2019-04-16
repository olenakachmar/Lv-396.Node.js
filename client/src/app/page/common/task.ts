export class TaskStatus {
  constructor(public name?: string,
              public value?: number) {
  }
}

export class TaskType {
  constructor(public name?: string,
              public value?: number) {
  }
}

export class Task {
  constructor(public id?: number,
              public name?: string,
              public excerpt?: string,
              public status: TaskStatus = new TaskStatus(),
              public type: TaskType = new TaskType(),
              public date?: string,
              public author?: string,
              public content?: string,
              public assignTo?: string,
              public reassigned?: string,
              public resolvedByAuthor?: boolean,
              public resolvedByPerformer?: boolean) {
  }
}
