import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import IConfiguration from "./configuration.model";
import { ObscureInputDirective } from "../obscure-input.directive";

@Component({
  selector: 'app-configure',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    ObscureInputDirective
  ],
  templateUrl: './configure.component.html'
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
    this.katiePhone = value.katiePhone;
  }
  @Output() public saveConfig = new EventEmitter<IConfiguration>();

  public accountSid: string = this.config?.accountSid || ''
  public authToken: string = this.config?.authToken || '';
  public fromPhone: string = this.config?.fromPhone || '';
  public daniellePhone: string = this.config?.daniellePhone || '';
  public katiePhone: string = this.config?.katiePhone || '';

  public get inputsValid() {
    return this.accountSid
      && this.authToken
      && this.fromPhone
      && this.phoneNumberValid(this.daniellePhone)
      && this.phoneNumberValid(this.katiePhone);
  }

  public onSaveConfig() {
    this.saveConfig.emit({
      accountSid: this.accountSid,
      authToken: this.authToken,
      fromPhone: this.fromPhone,
      daniellePhone: this.daniellePhone,
      katiePhone: this.katiePhone
    });
  }

  public phoneNumberValid(phoneNumber: string) {
    return phoneNumber.length === 12
      && phoneNumber.startsWith('+1')
      && phoneNumber.split('').slice(1).every(char => !isNaN(parseInt(char)))
  }
}
