export class User {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    manager: object;
    teamlead: object;
    department: object;
    email: string;
    phone: string;
    contacts: object;
    photoURL: string;
    hrID: number;
    date: object;
  
    constructor(values: Object = {}) {
      for (const key in values) {
        this[key] = values[key];
      }
    }
  }
  
  
  