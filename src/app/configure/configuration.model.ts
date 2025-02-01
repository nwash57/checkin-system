import ITherapist from './therapist.model';

export default interface IConfiguration {
  accountSid: string;
  authToken: string;
  fromPhone: string;
  therapists: ITherapist[];
}

