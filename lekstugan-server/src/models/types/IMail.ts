import {IMailParams} from './IMailParams';
export interface IMail {
  service_id: string;
  template_id: string;
  user_id: string;
  accessToken: string;
  template_params: IMailParams;
}
