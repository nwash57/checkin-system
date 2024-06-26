import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import IConfiguration from "./configuration.model";
import { ObscureInputDirective } from "../obscure-input.directive";
import { PasskeyEntryComponent } from "../passkey-entry/passkey-entry.component";

@Component({
  selector: 'app-configure',
  standalone: true,
  imports: [
    NgIf,
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
    this.daniellePhone = value.daniellePhone;
    this.katiPhone = value.katiPhone;
  }
  @Output() public saveConfig = new EventEmitter<IConfiguration>();

  public accountSid: string = this.config?.accountSid || ''
  public authToken: string = this.config?.authToken || '';
  public fromPhone: string = this.config?.fromPhone || '';
  public daniellePhone: string = this.config?.daniellePhone || '';
  public katiPhone: string = this.config?.katiPhone || '';

  needsPasskey: boolean = true;

  public get inputsValid() {
    return this.accountSid
      && this.authToken
      && this.fromPhone
      && this.phoneNumberValid(this.daniellePhone)
      && this.phoneNumberValid(this.katiPhone);
  }

  public onSaveConfig() {
    this.saveConfig.emit({
      accountSid: this.accountSid,
      authToken: this.authToken,
      fromPhone: this.fromPhone,
      daniellePhone: this.daniellePhone,
      katiPhone: this.katiPhone
    });
  }

  public phoneNumberValid(phoneNumber: string) {
    return phoneNumber.length === 10
      && !phoneNumber.startsWith('+1')
      && phoneNumber.split('').every(char => !isNaN(parseInt(char)))
  }

  onPasskeyCorrect() {
    this.needsPasskey = false;
  }
}
