export interface Task {
  id: number;
  name: string;
  excerpt: string;
  status: { name: string, value: number };
  type: { name: string, value: number };
  date: string;
  author: string;
  content: string;
  resolveByAuthor: boolean;
  resolveByDev: boolean;
}

export class TaskImpl {
  id: number;
  name: string;
  excerpt: string;
  status: { name: string, value: number } = {name: '', value: 0};
  type: { name: string, value: number } = {name: '', value: 0};
  date: string;
  author: string;
  content: string;
  resolveByAuthor: boolean;
  resolveByDev: boolean;
}
