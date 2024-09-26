import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-size-price',
  templateUrl: './size-price.component.html',
  styleUrls: ['./size-price.component.scss'],
})
export class SizePriceComponent implements OnInit, OnDestroy {
  @Input() sizeForm;
  @Input() pizzaItemIndex!: number;
  private previousPrice: number = 0; // Store the previous price value
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Initialize previousPrice with the initial value of the price
    this.previousPrice = this.sizeForm.get('price')?.value;

    this.isChecked.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((isChecked) => {
        if (!isChecked) {
          // Save the current price before setting it to 0
          this.previousPrice = this.sizeForm.get('price')?.value;
          this.price?.disable(); // Disable the price input
          this.price?.setValue(0); // Set the price to 0 when unchecked
        } else {
          // Restore the previous price
          this.price?.enable();
          this.price?.setValue(this.previousPrice); // Restore the previous price when rechecked
        }
      });
  }

  get isChecked() {
    return this.sizeForm.get('isChecked') as FormControl;
  }

  get price() {
    return this.sizeForm.get('price') as FormControl;
  }

  get size() {
    return this.sizeForm.get('name') as FormControl;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
