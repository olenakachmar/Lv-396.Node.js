export class Task {
    id: number;
    name: string;
    excerpt: string;
    status: {name, value};
    type: {name, value};
    date: string;
    author: string;
    content: string;
}
