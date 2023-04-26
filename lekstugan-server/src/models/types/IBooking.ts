export interface IBooking {
  date: Date;
  email: string;
  comment?: string;
  association: string;
  pending?: boolean;
  id?: string;
}