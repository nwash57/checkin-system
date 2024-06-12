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

  onCheckIn() {
    if (!this.therapist || !this.initials) {
      return;
    }

    this.isLoading = true;

    this.twilioService.sendCheckInDirect(this.therapist, this.initials).pipe(
      delay(2000)
    ).subscribe(res => {
      this.isLoading = false;
    });
  }

  onInitialsChanged(event: any) {
    this.initials = event.toUpperCase();
  }
}
