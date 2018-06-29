import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SessionService } from "src/app/session.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  
  public token;
  public headers;

  constructor(private http : HttpClient, private sessionStore : SessionService) { }

  

  getAllProducts() : Observable<any>{
    return this.http.get<any>('http://localhost:3001/product/all');
  }

  getProductById(productid) : Observable<any>{
    return this.http.get<any>('http://localhost:3001/product/id/'+productid);
  }
  getAllCategories() :Observable<any>{
    return this.http.get<any>('http://localhost:3001/product/categories');
  }
  getProductsByCategoryId(categoryid) :Observable<any>{
    return this.http.get<any>('http://localhost:3001/product/cid/'+categoryid);
  }

  addProductToCart(productid) :Observable<any>{
      var userid = this.sessionStore.getValueFromSession("userID");
      this.token = this.sessionStore.getValueFromSession('_t'); 
      this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'bearer '+this.token);
      var cartObject = {userID:userid, productID : productid};
      return this.http.post("http://localhost:3001/product/addToCart", cartObject, {headers : this.headers});
  }

  getAllCartItems(userid) :Observable<any>{
    return this.http.get("http://localhost:3001/product/getUserCart/"+userid);
  }
    

  deleteItemFromCart(productid) :Observable<any>{
    this.token = this.sessionStore.getValueFromSession('_t'); 
    this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'bearer '+this.token);
    var isLogged = this.sessionStore.getValueFromSession('isLoggedIn');
    if(!isLogged){
      alert("No Active Session. Please Login To delete cart");
      return;
    }
    else{
      var userid = this.sessionStore.getValueFromSession("userID");
      console.log(userid);
      var cartObject = {email:userid, productID : productid};
      return this.http.post("http://localhost:3001/product/deleteCart", cartObject, {headers : this.headers});
    }
    
  }
     
  

}
