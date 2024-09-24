import { Component, Input, OnInit,  } from '@angular/core';
import { Price, Size } from '../pizza.data';

@Component({
  selector: 'app-size-price',
  templateUrl: './size-price.component.html',
  styleUrl: './size-price.component.css',
})
export class SizePriceComponent implements OnInit {
  @Input() size!: Size;
  @Input() price!: Price;
    
  isChecked: boolean = true; // Track selection state locally
  displayPrice: number = 0.00;

  ngOnInit(): void {
    this.displayPrice = this.price?.price;
  }

  toggleSelection() {
    this.isChecked = !this.isChecked;
    
    if (this.isChecked) {
      // Set the display price to the actual price from pizza.data
      this.displayPrice = this.price.price;
    } else {
      this.displayPrice = 0.00;
    }

  }
}
