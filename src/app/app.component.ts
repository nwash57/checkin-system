import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { TwilioService } from "./twilio.service";
import { CommonModule } from "@angular/common";
import { FunctionCodeService } from "./function-code.service";
import { PasskeyEntryComponent } from "./passkey-entry/passkey-entry.component";
import { CheckInComponent } from "./check-in/check-in.component";
import { ConfigurationService } from "./configure/configuration.service";
import { ConfigureComponent } from "./configure/configure.component";
import IConfiguration from "./configure/configuration.model";
import { ReconfigureButtonComponent } from "./reconfigure-button/reconfigure-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, PasskeyEntryComponent, CheckInComponent, ConfigureComponent, ReconfigureButtonComponent],
  templateUrl: './app.component.html',
  host: { class: 'flex flex-col h-full'}
})
export class AppComponent {

  private readonly configurationService = inject(ConfigurationService);

  title = 'therapy-checkin';

  config = this.configurationService.getConfiguration();
  public get needsConfiguration() { return this.config === null || !this.config?.therapists?.length; }

  reconfiguring: boolean = false;

  onSaveConfig(config: IConfiguration) {
    console.log('Saving configuration', config);
    this.configurationService.saveConfiguration(config);
    this.config = config;
    this.reconfiguring = false;
  }

  onReconfigurationClicked() {
    this.reconfiguring = !this.reconfiguring;
  }
}
