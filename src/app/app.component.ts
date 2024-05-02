import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { TwilioService } from "./twilio.service";
import { CommonModule } from "@angular/common";
import { FunctionCodeService } from "./function-code.service";
import { PasskeyEntryComponent } from "./passkey-entry/passkey-entry.component";
import { CheckInComponent } from "./check-in/check-in.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, PasskeyEntryComponent, CheckInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: { class: 'flex flex-col h-full'}
})
export class AppComponent {
  private readonly functionCodeService = inject(FunctionCodeService)

  hasFunctionCode: boolean = this.functionCodeService.getFunctionCodeFromLocalStorage() != null;

  title = 'therapy-checkin';

  onFunctionCodeChange(code: string) {
    this.hasFunctionCode = code != null;
  }
}
