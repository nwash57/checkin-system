import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ConfigurationService } from '../configure/configuration.service';
import { TwilioService } from "../twilio.service";
import { CommonModule } from "@angular/common";
import { catchError, delay, EMPTY } from "rxjs";

@Component({
  selector: 'app-check-in',
  standalone: true,
	imports: [
    CommonModule,
		FormsModule
	],
  templateUrl: './check-in.component.html',
  host: { class: 'flex flex-col h-full justify-center' }
})
export class CheckInComponent {
  private readonly configService = inject(ConfigurationService);
  private readonly twilioService = inject(TwilioService);

  therapists = this.configService.getConfiguration()?.therapists || [];

  initials: string = '';
  selectedTherapist: string | null = null;
  isLoading: boolean = false;
  showConfirmation: boolean = false;
  sendTimeout: boolean = false;

  onCheckIn() {
    if (this.isLoading || !this.selectedTherapist || !this.initials) {
      return;
    }

    this.isLoading = true;

    this.twilioService.sendCheckInDirect(this.selectedTherapist, this.initials).pipe(
      delay(2000),
      catchError(err => {
        console.error(err);
        return EMPTY;
      })
    ).subscribe(res => {
      this.selectedTherapist = null;
      this.isLoading = false;
      this.initials = '';
      this.showConfirmation = true;
      this.startSpamTimeout();
      this.startConfirmationTimeout();
    });
  }

  onInitialsChanged(event: any) {
    this.initials = event.toUpperCase();
  }

  private startConfirmationTimeout() {
    setTimeout(() => {
      this.showConfirmation = false;
    }, 5000);
  }

  private startSpamTimeout() {
    setTimeout(() => {
      this.sendTimeout = false;
    }, 20000);
  }
}
