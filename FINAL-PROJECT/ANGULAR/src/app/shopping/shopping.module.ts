import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from "src/app/shopping/shopping.component";
import { DisplayitemComponent } from './displayitem/displayitem.component';
import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  imports: [
    CommonModule,
    ShoppingRoutingModule
  ],
  declarations: [
    ShoppingComponent, 
    DisplayitemComponent, 
    SingleproductComponent, CartComponent
  ]
})
export class ShoppingModule { }
