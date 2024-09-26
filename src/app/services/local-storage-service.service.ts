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
    localStorage.setItem(storageKey, JSON.stringify(formData.pizzas));
  }
}
