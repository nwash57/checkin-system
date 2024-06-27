import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TwilioService } from "../twilio.service";
import { CommonModule } from "@angular/common";
import { delay } from "rxjs";
import { TherapistName } from "../therapist-name.type";

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
  private readonly twilioService = inject(TwilioService);

  initials: string = '';
  therapist: TherapistName | null = null;
  isLoading: boolean = false;
  showConfirmation: boolean = false;
  sendTimeout: boolean = false;

  onCheckIn() {
    if (this.isLoading || !this.therapist || !this.initials) {
      return;
    }

    this.isLoading = true;

    this.twilioService.sendCheckInDirect(this.therapist, this.initials).pipe(
      delay(2000)
    ).subscribe(res => {
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
