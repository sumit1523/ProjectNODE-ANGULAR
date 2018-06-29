import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from "src/app/shopping/shopping.component";
import { DisplayitemComponent } from "src/app/shopping/displayitem/displayitem.component";
import { SingleproductComponent } from "src/app/shopping/singleproduct/singleproduct.component";
import { CartComponent } from "src/app/shopping/cart/cart.component";

const shoppingRoutes: Routes = [
  {path:'', component: ShoppingComponent, children: [
    {path : 'display' , component: DisplayitemComponent},
    {path : 'display/id/:productid' , component: SingleproductComponent},
    {path : 'cart' , component: CartComponent},
    {path : '**' , redirectTo: 'display'}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(shoppingRoutes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
