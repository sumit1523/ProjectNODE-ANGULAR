import { Component, OnInit } from '@angular/core';
import { ShoppingService } from "src/app/shopping.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-displayitem',
  templateUrl: './displayitem.component.html',
  styleUrls: ['./displayitem.component.css']
})
export class DisplayitemComponent implements OnInit {

  public allProductsList;
  public categories;
  public filteredProductList=[];
  constructor(private shoppingService : ShoppingService, private router : Router, private sessionStore : SessionService) { }

  ngOnInit() {
    this.getAllProducts();
    this.shoppingService.getAllCategories().subscribe(data=>{
      //console.log(data);
      this.categories = data;
    });
  }

  filterProduct(event, categoryid){
    event.preventDefault();
    if(event.target.checked){
      this.shoppingService.getProductsByCategoryId(categoryid).subscribe(list=>{
        list.forEach(element => {
          this.filteredProductList.push(element)
          
        });
        this.allProductsList = this.filteredProductList;
      });
      
    }
    if(!event.target.checked){
      const result = this.filteredProductList.filter(ele => ele.CategoryID!=categoryid);
      this.filteredProductList= result;
      if(this.filteredProductList.length!=0)
        this.allProductsList = this.filteredProductList;
      else
        this.getAllProducts();
    }
    
  }

  getProductsByCID(categoryid){
    this.shoppingService.getProductsByCategoryId(categoryid).subscribe(list=>{
      console.log(list);
    });
  }

  getAllProducts(){
    this.shoppingService.getAllProducts().subscribe(list=>{
      //console.log(list);
      this.allProductsList = list;
    })
  }


  moreDetails(productid){
    this.router.navigate(['shopping/display/id/'+productid]);
  }

  addToCart(productid){
    var islogged = this.sessionStore.getValueFromSession("isLoggedIn");
    if(islogged){
      this.shoppingService.addProductToCart(productid).subscribe(data=>{
        if(data==="success")  
          alert("Product added to Cart");
      },err=>{
        alert(err.error);
      })
    }
    else
      alert("please Login to add Products to your Cart");
  }


}

