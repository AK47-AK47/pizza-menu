import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IPizzaItem, PIZZA_ITEMS } from '../utilities/pizza-mapping.util';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss'],
})
export class PizzaItemComponent implements OnInit {
  @Input() pizzaForm;
  @Input() pizzaIndex!: number;
  pizzaItem!: IPizzaItem;
  initialPrices!: number[];
  showUndoButton$ = new Subject<boolean>(); // Subject to control Undo button visibility

  ngOnInit(): void {
    //get initial prices
    this.initialPrices = this.getInitialPrices();

    // check for changes on input formcontrol of pizzaForm and if change then enable undo button
    // Set up the observable to listen for price changes
    this.setupPriceChangeListener();
  }

  // Set up an observable that tracks changes to the price fields
  setupPriceChangeListener(): void {
    //first get sizes (Form)array
    const sizes = this.pizzaForm.get('sizes') as FormArray;

    // Subscribe to changes for each price field in the sizes (Form)array
    sizes.controls.forEach((size) => {
      size.get('price')?.valueChanges.subscribe(() => {
        this.showUndoButton$.next(true); // Show the Undo button when a price field changes
      });
    });
  }

  get sizes():FormArray {
    return this.pizzaForm.get('sizes') as FormArray;
  }

  getInitialPrices(): number[] {
    this.pizzaItem = PIZZA_ITEMS[this.pizzaIndex];
    return this.pizzaItem.sizes.map((size) => size.price);
  }

  resetItem(): void {
    //get sizes (Form)array
    const sizes = this.pizzaForm.get('sizes') as FormArray;

    sizes.controls.forEach((size, index) => {
      size.get('price')?.setValue(this.initialPrices[index]); // Reset each price to its initial value
    });

    // Hide the Undo button after resetting
    this.showUndoButton$.next(false);
  }
}
