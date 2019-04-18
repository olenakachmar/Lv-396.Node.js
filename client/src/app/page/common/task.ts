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
  constructor(public id?: string,
              public name?: string,
              public excerpt?: string,
              public status: TaskStatus = new TaskStatus(),
              public type: TaskType = new TaskType(),
              public date?: string,
              public author?: string,
              public content?: string,
              public resolvedByAuthor?: boolean,
              public resolvedByPerformer?: boolean) {
  }
}

export class TaskCreateRequestBody {
  constructor(public name?: string,
              public excerpt?: string,
              public statusName?: string,
              public statusValue?: number,
              public typeName?: string,
              public typeValue?: number,
              public author?: string,
              public content?: string,
              public assignTo?: string) {
  }
}

export class TaskEditRequestBody {
  constructor(public id?: string,
              public name?: string,
              public excerpt?: string,
              public status: TaskStatus = new TaskStatus(),
              public author?: string,
              public content?: string,
              public assignTo?: string,
              public reassigned?: string) {
  }
}
