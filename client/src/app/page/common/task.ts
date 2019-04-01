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

// export interface TaskInterface {
//   id: number;
//   name: string;
//   excerpt: string;
//   status: { name: string, value: number };
//   type: { name: string, value: number };
//   date: string;
//   author: string;
//   content: string;
// }
//
// export class Task implements TaskInterface {
//   constructor(public id,
//               public name,
//               public excerpt,
//               public status,
//               public type,
//               public date,
//               public author,
//               public content) {
//     this.id = id;
//     this.name = name;
//     this.excerpt = excerpt;
//     this.status = status;
//     this.type = type;
//     this.date = date;
//     this.author = this.author;
//     this.content = content;
//   }
// }