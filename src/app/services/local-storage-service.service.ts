import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  private storageKey: string = 'pizza-selections';

  getPizzaSelections() {
    const storedData = localStorage.getItem(this.storageKey);
    try {
      //if storedData exist return it else return null
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Error parsing local storage data:', error);
      return null;
    }
  }

  updatePizzaSelections(itemID: number, sizeName: string, newPrice: number) {
    //get all storedPizzaData from localStorage
    const storedPizzaSelections = this.getPizzaSelections() || {};
    //get the specific (itemID) data
    storedPizzaSelections[itemID] = storedPizzaSelections[itemID] || [];
    
    const existingPizzaSelection = storedPizzaSelections[itemID].find(
      (pizzaSize: { size: string; }) => pizzaSize.size === sizeName
    );
    
    if (existingPizzaSelection) {
      existingPizzaSelection.price = newPrice;
    } else {
      storedPizzaSelections[itemID].push({ size: sizeName, price: newPrice });
    }
    localStorage.setItem(this.storageKey, JSON.stringify(storedPizzaSelections));

  }
}
