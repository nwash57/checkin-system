import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { catchError, EMPTY, Observable, tap } from "rxjs";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class FunctionCodeService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  private readonly localStorage = this.document.defaultView?.localStorage;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = this.document.defaultView?.localStorage;
  }

  public getFunctionCodeFromLocalStorage() {
    if (!localStorage) {
      throw new Error("Failed to get reference to local storage")
    }

    return localStorage.getItem("function-code")
  }

  public fetchFunctionCode(passKey: string): Observable<string> {
    console.debug("fetching function code");
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<string>(`${this.apiUrl}/GetCode`, { passKey }, { headers, responseType: 'text' as 'json'}).pipe(
      tap(code => {
        if (!localStorage) {
          throw new Error("Failed to get reference to local storage")
        }

        localStorage.setItem("function-code", code);
      })
    );
  }
}
