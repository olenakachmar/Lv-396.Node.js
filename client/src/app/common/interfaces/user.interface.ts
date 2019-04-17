import { IManager } from './manager.interface';
import { ITeamlead } from './teamlead.interface';

export interface IUser {
  firstName: string;
  lastName: string;
  position: string;
  manager?: IManager;
  teamlead: ITeamlead;
  department: object;
  email: string;
  phone: string;
  contacts: object;
  photoURL: string;
  hrID: number;
  date: object;
}
