import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { FunctionCodeService } from "./function-code.service";

@Injectable({
  providedIn: 'root'
})
export class TwilioService {
  private readonly functionCodeService = inject(FunctionCodeService);
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  sendCheckIn(initials: string) {
    const functionCode = this.functionCodeService.getFunctionCodeFromLocalStorage();
    return this.http.post(`${this.apiUrl}/CheckIn?code=${functionCode}`, { initials });
  }
}
