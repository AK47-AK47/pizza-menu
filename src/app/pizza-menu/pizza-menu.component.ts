import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { PIZZA_ITEMS, IPizzaItem } from '../utilities/pizza-mapping.util';
import { LocalStorageService } from '../services/local-storage-service.service';
import { Subject, takeUntil } from 'rxjs';

const STORAGE_KEY = 'pizzaItems';

@Component({
  selector: 'app-pizza-menu',
  templateUrl: './pizza-menu.component.html',
  styleUrls: ['./pizza-menu.component.scss'],
})
export class PizzaMenuComponent implements OnInit, OnDestroy {
  pizzaForm!: FormGroup;
  pizzaItems: IPizzaItem[] = PIZZA_ITEMS;
  selectedItemIndex: number | null = null;
  private destroy$ = new Subject<void>();
  
  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    // Load from LocalStorage if available
    const savedItems = this.localStorageService.getItem(STORAGE_KEY);
    if (savedItems) {
      this.pizzaItems = JSON.parse(savedItems);
    }

    this.pizzaForm = this.fb.group({
      pizzas: this.createPizzaFormArray(this.pizzaItems),
    });

    // Persist changes whenever the form updates
    this.pizzaForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((pizzaFormValue) => {
        this.localStorageService.saveChanges(pizzaFormValue, STORAGE_KEY);
      });
  }

  get pizzas(): FormArray {
    return this.pizzaForm.get('pizzas') as FormArray;
  }

  createPizzaFormArray(items: IPizzaItem[]): FormArray {
    const formArray = this.fb.array(
      items.map((item) =>
        this.fb.group({
          name: this.fb.control(item.name),
          sizes: this.fb.array(
            item.sizes.map((size) => this.createSizeForm(size))
          ),
        })
      )
    );
    return formArray;
  }

  createSizeForm(size: {
    name: string;
    price: number;
    isChecked: boolean;
  }): FormGroup {
    return this.fb.group({
      name: [size.name],
      price: [{ value: size.price, disabled: !size.isChecked }],
      isChecked: [size.isChecked],
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
