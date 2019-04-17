import { IManager } from './manager.interface';

export interface IUser {
  firstName: string;
  lastName: string;
  position: string;
  manager?: IManager;
  teamlead: IUser;
  department: object;
  email: string;
  phone: string;
  contacts: object;
  photoURL: string;
  hrID: number;
  date: object;
}
