export class Task {
  id: number;
  name: string;
  excerpt: string;
  status: {name: string, value: number};
  type: {name: string, value: number};
  date: string;
  author: string;
  content: string;
}
