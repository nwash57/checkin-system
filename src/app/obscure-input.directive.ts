import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appObscureOnBlur]',
  standalone: true
})
export class ObscureInputDirective {

  constructor(private el: ElementRef) {}

  @HostListener('focus') onFocus() {
    this.el.nativeElement.type = 'text';
  }

  @HostListener('blur') onBlur() {
    this.el.nativeElement.type = 'password';
  }
}
