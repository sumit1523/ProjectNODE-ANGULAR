import { Component, OnInit } from '@angular/core';
import { SessionService } from "src/app/session.service";
import { ShoppingService } from "src/app/shopping.service";
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartList = [];
  public productList = [];
  public totalPrice = 0;



  constructor(private sessionStore : SessionService, private shoppingService : ShoppingService) { }


  ngOnInit() {
    this.productList = [];
    var isLogged = this.sessionStore.getValueFromSession('isLoggedIn');
    if(!isLogged){
      alert("Please Login to see the Cart Items");
    }
    else{
      this.getCartDetailsAndPrice();
    }
  }
  
  getCartDetailsAndPrice(){
    var userid = this.sessionStore.getValueFromSession('userID');
    this.shoppingService.getAllCartItems(userid).subscribe(data=>{
      this.productList = data.ProductList;
      this.totalPrice = data.TotalPrice;
    },err=>{alert(err.error)})
  }

  deleteItem(productid){
    this.shoppingService.deleteItemFromCart(productid).subscribe(res=>{
      this.getCartDetailsAndPrice();
    },err=>{alert(err.error)})
    
  }

}

