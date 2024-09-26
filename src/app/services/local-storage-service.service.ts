import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(storageKey: string) {
    return localStorage.getItem(storageKey);
  }

  saveChanges(formData: { pizzas: any; }, storageKey:string): void {
    // console.log(formData.pizzas);
    // formData.pizzas.forEach(pizzaElement => {
    //   console.log(pizzaElement[0]);
    // });
    localStorage.setItem(storageKey, JSON.stringify(formData.pizzas));
  }
}
