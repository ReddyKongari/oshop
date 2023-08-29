import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }
  getAll(): Observable<any[]> {
    return this.db.list('/categories').snapshotChanges().pipe(map(response => {
    return  response.map((a: any) => {
        const key = a.payload.key;
        const data = { key: key, data: a.payload.val() };
        return  data;
      })
    }));
  }
}
