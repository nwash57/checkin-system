import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import IConfiguration from "./configuration.model";
import { ObscureInputDirective } from "../obscure-input.directive";
import { PasskeyEntryComponent } from "../passkey-entry/passkey-entry.component";
import ITherapist from './therapist.model';

@Component({
  selector: 'app-configure',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ObscureInputDirective,
    PasskeyEntryComponent
  ],
  templateUrl: './configure.component.html',
  host: { class: 'flex flex-col h-full justify-center'}
})
export class ConfigureComponent {
  @Input() set config(value: IConfiguration | null) {
    if (!value) {
      return;
    }

    this.accountSid = value.accountSid;
    this.authToken = value.authToken;
    this.fromPhone = value.fromPhone;
    this.therapists = value.therapists || [];
  }
  @Output() public saveConfig = new EventEmitter<IConfiguration>();

  public accountSid: string = this.config?.accountSid || ''
  public authToken: string = this.config?.authToken || '';
  public fromPhone: string = this.config?.fromPhone || '';
  public therapists: ITherapist[] = this.config?.therapists || [];

  needsPasskey: boolean = true;

  public get inputsValid() {
    return this.accountSid
      && this.authToken
      && this.fromPhone
      && this.therapists.every(t => this.therapistValid(t))
  }

  public onSaveConfig() {
    this.saveConfig.emit({
      accountSid: this.accountSid,
      authToken: this.authToken,
      fromPhone: this.fromPhone,
      therapists: this.therapists
    });
  }

  public therapistValid(therapist: ITherapist) {
    return therapist.name.length > 0 && this.phoneNumberValid(therapist.phone);
  }

  public phoneNumberValid(phoneNumber: string) {
    return phoneNumber.length === 10
      && !phoneNumber.startsWith('+1')
      && phoneNumber.split('').every(char => !isNaN(parseInt(char)))
  }

  onPasskeyCorrect() {
    this.needsPasskey = false;
  }

  onAddTherapist() {
    this.therapists = [...this.therapists, {name: '', phone: ''}];
  }

  onRemoveTherapist(index: number) {
    this.therapists.splice(index, 1);
  }

  onMoveTherapistUp(index: number) {
    const therapist = this.therapists[index];
    this.therapists.splice(index, 1);
    this.therapists.splice(index - 1, 0, therapist);
  }

  onMoveTherapistDown(index: number) {
    const therapist = this.therapists[index];
    this.therapists.splice(index, 1);
    this.therapists.splice(index + 1, 0, therapist);
  }
}
