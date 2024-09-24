import { Component } from '@angular/core';
import { PizzaItemComponent } from '../pizza-item/pizza-item.component';
import { Item, Price, Size, items } from '../pizza.data';

@Component({
  selector: 'app-pizza-menu',
  templateUrl: './pizza-menu.component.html',
  styleUrl: './pizza-menu.component.css',
})
export class PizzaMenuComponent {
  accordionItems = [false, false]; // Array to track open/closed states
  pizzaItems: Item[] = items;

  toggleAccordion(index: number) {
    this.accordionItems[index] = !this.accordionItems[index];
  }
}
