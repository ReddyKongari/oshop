import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }
  create(product: any) {
    return this.db.list('/products').push(product);
  }
  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(map(actions => {
      return actions.map((a: any) => {
        const key = a.payload.key;
        const data = { key, ...a.payload.val() };
        return { data, key };
      })
    }))
  }
  getById(productId: any) {
    return this.db.object('/products/' + productId);
  }
  update(productId: string, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }
}
