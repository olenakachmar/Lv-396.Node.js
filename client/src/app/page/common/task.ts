export class Task {
  id: number;
  name: string;
  excerpt: string;
  status: {name: string, value: number} = {name: '', value: 0};
  type: {name: string, value: number} = {name: '', value: 0};
  date: string;
  author: string;
  content: string;
}
