import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaMenuComponent } from './pizza-menu/pizza-menu.component';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';
import { SizePriceComponent } from './size-price/size-price.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';



@NgModule({
  declarations: [
    AppComponent,
    PizzaMenuComponent,
    PizzaItemComponent,
    SizePriceComponent,
    NumbersOnlyDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
