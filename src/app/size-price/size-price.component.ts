import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Price, Size } from '../pizza.data';

@Component({
  selector: 'app-size-price',
  templateUrl: './size-price.component.html',
  styleUrl: './size-price.component.css',
})
export class SizePriceComponent {
  @Input() size!: Size;
  @Input() price!: Price;
  @Output() priceChange = new EventEmitter<number>();
}
