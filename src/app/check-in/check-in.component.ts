import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TwilioService } from "../twilio.service";
import { CommonModule } from "@angular/common";
import { delay } from "rxjs";

@Component({
  selector: 'app-check-in',
  standalone: true,
	imports: [
    CommonModule,
		FormsModule
	],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.scss',
  host: { class: 'flex flex-col h-full justify-center' }
})
export class CheckInComponent {
  private readonly twilioService = inject(TwilioService);

  initials: string = '';
  therapist: 'katie' | 'danielle' | null = null;
  isLoading: boolean = false;

  onCheckIn(initials: string) {
    this.isLoading = true;

    this.twilioService.sendCheckIn(this.initials, this.therapist as string).pipe(
      delay(2000)
    ).subscribe(res => {
      this.isLoading = false;
    });
  }

  onInitialsChanged(event: any) {
    this.initials = event.toUpperCase();
  }
}
