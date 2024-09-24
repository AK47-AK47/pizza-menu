import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersOnly]',
})
export class NumbersOnlyDirective {
  constructor(private el: ElementRef) {}
  /*
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const value = event.target.value.replace(/[^0-9.]/g, ''); // Allow decimal points (optional)
    event.target.value = value;
  }
  */

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]*(\.[0-9]+)?$/; // Allow decimal points and optional leading zero

    // Allow backspace, delete, and arrow keys
    if (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      (event.key >= 'ArrowLeft' && event.key <= 'ArrowRight')
    ) {
      return;
    }

    // Allow decimal point only if there isn't one already and it's not at the end, and it's not empty
    if (
      event.key === '.' &&
      input.value.indexOf('.') === -1 &&
      input.value.length !== 0
    ) {
      return; 
    }

    // Check if the current input value plus the newly pressed key matches the regular expression
    if (!regex.test(input.value + event.key)) {
      event.preventDefault();
    }
  }
}

