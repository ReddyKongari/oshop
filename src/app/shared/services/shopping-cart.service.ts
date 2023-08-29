import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AppProduct } from 'shared/models/app-product';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) { }
  clearCart() {
    let cartId = localStorage.getItem('cartId');
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(map((x: any) => Object.assign(new ShoppingCart(x.items))));
  }
  addToCart(product: AppProduct) {
    this.updateItem(product, 1);
  }
  removeFromCart(product: AppProduct) {
    this.updateItem(product, -1);
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }
  private getItem(cartId: string, productId: any) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
  private async updateItem(product: AppProduct, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item = this.getItem(cartId, product.uid);
    item.snapshotChanges().pipe(take(1)).subscribe(it => {

      let data: any = it.payload?.val();
      let quantity = (data?.quantity || 0) + change;
      if (quantity === 0) item.remove();
      else item.update({
        //product: product, 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    })
  }
}

