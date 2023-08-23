import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { AppProduct } from './models/app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: AppProduct[];
  constructor(private db: AngularFireDatabase) { }
  create(product: any) {
    return this.db.list('/products').push(product);
  }
  getAll(): Observable<AppProduct[]> {
    return this.db.list('/products').snapshotChanges().pipe(map(actions => {
      return actions.map((a: any) => {
        const key = a.payload.key;
        const data = Object.assign(new AppProduct, { uid: key, title: a.payload.val().title, price: a.payload.val().price });
        return data
      })
    }))
  }
  // getAll(): Observable<AppProduct> {
  //   return this.db.list('/products').snapshotChanges().pipe(map(actions => {
  //     return actions.map((a: any) => {
  //       const key = a.payload.key;
  //       const data = { key, ...a.payload.val() };
  //       var appProduct = { title: data.title, price: data.price, uid: key }
  //       return this.products.push(appProduct);
  //     })
  //     return this.products;
  //   }))
  // }
  //   getAll(): Observable<AppProduct[]> {
  //     return this.db.list('/products').snapshotChanges().pipe(map(res => {
  //       return res.map(item => {
  //         const key = item.payload.key;
  //         const data= {key,...item.payload.val()};


  //       })
  //     }))
  //   }
  // }
  // getAll():Observable<AppProduct[]> {
  //   return this.db.list('/products').snapshotChanges()
  //   .pipe(
  //     map((res) => {      
  //     res.forEach(element => {
  //       let  product = element.payload.toJSON();
  //       this.products.push( product as AppProduct);
  //       return this.products as AppProduct[];
  //     });
  //     return this.products;
  //   }));
  // }
  // getAll() {
  //   return this.db.list('/products').snapshotChanges().pipe(map(actions => {
  //     return actions.map((a: any) => {
  //       const key = a.payload.key;
  //       const data = { key, ...a.payload.val() };
  //       return { data, key };
  //     })
  //   }))
  // }
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
