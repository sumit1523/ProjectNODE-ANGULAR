import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ShoppingService } from "src/app/shopping.service";
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {

  public productid;
  public product;
  constructor(private router : ActivatedRoute, private shoppingService : ShoppingService, private sessionStore : SessionService, private route : Router) { }

  ngOnInit() {
    this.productid = this.router.snapshot.params.productid;
    this.shoppingService.getProductById(this.productid).subscribe((Product)=>{
      this.product = Product;
    },err=>{this.route.navigate(['/error']);alert(err.error); });
  }

  addToCart(productid){
    var islogged = this.sessionStore.getValueFromSession("isLoggedIn");
    if(islogged){
      this.shoppingService.addProductToCart(productid).subscribe(data=>{
        if(data==="success")  
          alert("Product added to Cart");
      },err=>{alert(err.error);})
    }
    else
      alert("please Login to add Products to your Cart");
  }
  goToCart(){
    var islogged = this.sessionStore.getValueFromSession("isLoggedIn");
    if(islogged){
        this.route.navigate(['shopping/cart']);
      }
      else
        alert("Please Login To go to the cart");
  }


}
