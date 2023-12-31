import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }
  query: any;
  async storeOrder(order: any) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
  getOrders() {
    return this.db.list('/orders').valueChanges();
  }
  getOrdersByUser(userId: string): any {
    return this.db.list('/orders',ref=> ref.orderByChild('userId').equalTo(userId)).valueChanges();    
    //  {
    //   query: {
    //     orderByChild: 'userId',
    //     equalTo: userId
    //   }
    // });
  }
}
