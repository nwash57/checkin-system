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
  styleUrl: './passkey-entry.component.scss',
  host: {class: 'flex flex-col h-full justify-center'}
})
export class PasskeyEntryComponent {
  private readonly functionCodeService = inject(FunctionCodeService);

  @Output() functionCodeChange = new EventEmitter<string>();

  isLoading: boolean = false;
  passKey: string | null = null;

  onSubmitPasskey() {
    if (this.passKey != null) {
      this.isLoading = true;

      this.functionCodeService.fetchFunctionCode(this.passKey)
        .pipe(
          delay(2000))
        .subscribe(code => {
          this.functionCodeChange.emit(code);
          this.isLoading = false;
        });
    }
  }
}
