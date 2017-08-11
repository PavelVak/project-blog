import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Item } from './inventory.model';
import 'rxjs/add/operator/map'

@Injectable()
export class InventoryService{
  item: Item ;
  items: FirebaseListObservable<Item[]>;
  constructor(private db: AngularFireDatabase) {
    this.items = this.db.list('/items');
  }

  getAllItems() {
    /*!!!!!!!!!!!!!!!!придумал сам поэтому проверить!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    debugger;
    return this.items.map(
      (data) => data.map(x => x as Item)
    );
  }

  deleteItemByKey($key: string) {
    /*!!!!!!!!!!!!!!!!придумал сам поэтому проверить!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    this.items.remove($key);
  }

  addItem(item: Item) {
    /*!!!!!!!!!!!!!!!!придумал сам поэтому проверить!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    this.items.push(item);
  }

  editItem(key: string,item: Item) {
    /*!!!!!!!!!!!!!!!!придумал сам поэтому проверить!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    this.db.object('items/'+key).update(item);
  }

}
