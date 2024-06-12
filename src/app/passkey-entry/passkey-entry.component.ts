import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FunctionCodeService } from "../function-code.service";
import { NgIf } from "@angular/common";
import { delay } from "rxjs";

@Component({
  selector: 'app-passkey-entry',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './passkey-entry.component.html',
  host: {class: 'flex flex-col h-full justify-center'}
})
export class PasskeyEntryComponent {

  @Output() passkeyCorrect = new EventEmitter<void>();

  isLoading: boolean = false;
  passKey: string | null = null;

  onSubmitPasskey() {
    if (!this.passKey) {
      return;
    }

    if (this.passKey != "Mr. Peanutbutter's House") {
      return;
    }

    this.passkeyCorrect.emit();
  }
}
