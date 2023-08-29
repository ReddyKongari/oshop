import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { AppProduct } from 'shared/models/app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: AppProduct[];
  i: number = 0;
  constructor(private db: AngularFireDatabase) { }
  create(product: any) {
    return this.db.list('/products').push(product);
  }
   getAll(): Observable<AppProduct[]> {
    this.i = 0;    
    return this.db.list('/products').snapshotChanges().pipe(map(actions => {
      return actions.map((a: any) => {
        const key = a.payload.key;
        const data = Object.assign(new AppProduct, { id: ++this.i, uid: key, title: a.payload.val().title, price: a.payload.val().price,imageUrl:a.payload.val().imageUrl,category:a.payload.val().category });
        return data
      })
    }))
  }
  getById(productId: any) {
    return this.db.object('/products/' + productId);
  }
  update(productId: string, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
