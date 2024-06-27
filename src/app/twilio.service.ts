import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { FunctionCodeService } from "./function-code.service";
import { TherapistName } from "./therapist-name.type";
import { ConfigurationService } from "./configure/configuration.service";
import { EMPTY } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TwilioService {

  private readonly twilioApiUrl = environment.twilioApiUrl;
  private readonly configService = inject(ConfigurationService);
  private readonly http = inject(HttpClient);

  sendCheckInDirect(therapist: TherapistName, initials: string) {
    const config = this.configService.getConfiguration();
    if (!config) {
      console.error("No configuration found");
      return EMPTY;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${config.accountSid}:${config.authToken}`),
    });

    const body = new URLSearchParams();
    body.set('From', `+1${config.fromPhone}`);

    let therapistPhone = therapist === 'danielle' ? config.daniellePhone : config.katiPhone;
    body.set('To', `+1${therapistPhone}`);

    body.set('Body', `[${this.getCurrentTime()}] Client ${initials} has checked in.`);

    return this.http.post(
      `${this.twilioApiUrl}/Accounts/${config.accountSid}/Messages.json`,
      body.toString(),
      {headers});
  }

  private getCurrentTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';

    hours %= 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let strTime = hours + ':' + minutes + ' ' + ampm;

    return strTime;
  }
}


