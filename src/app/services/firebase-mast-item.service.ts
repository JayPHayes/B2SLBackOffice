import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseMastItemService {
  item: FirebaseObjectObservable<Item>
  itemList: FirebaseListObservable<any[]>

  constructor(private db: AngularFireDatabase) {
    this.itemList  = this.db.list(environment.FB_NODE_MAST_ITEM.name) as FirebaseListObservable<Item[]>;
   }

  delItem(key){
    return this.itemList.remove(key);
  }

  addItem(newItem){
    console.log('newItem: ', newItem)
    return this.itemList.push(newItem)
  }

    updateItem(key, item){
    console.log('item: ', item)

    return this.itemList.update(key, item)
  }

  getItems(){
    return this.itemList;
  }

  getItemDetails(key){
    console.log('key: ', key)
    this.item = this.db.object(environment.FB_NODE_MAST_ITEM.name + '/' + key) as FirebaseObjectObservable<Item>
    
    console.log(this.item);
    return this.item
  }

}


interface Item {
  $key?: string;
  itemName?: string;
  desc?: string;
  qty?: string;
  itemImageUrl?: string;
  notes?: string;
  type?: string;
  itemRetail01?: string;
  itemRetail01Name?: string;
  itemRetail02?: string;
  itemRetail02Name?: string;
  itemRetail03?: string;
  itemRetail03Name?: string;
      
}