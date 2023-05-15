import {IAssociation} from './IAssociation';
export interface IBooking {
  date: Date;
  email: string;
  comment?: string;
  association?: IAssociation;
  pending?: boolean;
  id?: string;
  // key?: string;
}
