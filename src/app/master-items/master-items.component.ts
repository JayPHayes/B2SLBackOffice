
import { FirebaseMastItemService } from './../services/firebase-mast-item.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { FirebaseService } from './../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Router } from '@angular/router'
import { FilterPipe } from './../pipes/filter.pipe';


@Component({
  selector: 'app-master-items',
  templateUrl: './master-items.component.html',
  styleUrls: ['./master-items.component.css']
})
export class MasterItemsComponent implements OnInit {
  itemList: any;

  
  selectedItem: any;
  selItemName1: string = ""

  selItemKey: string = "";
  selItemName: string = "";
  selItemDesc: string = "";
  selItemQty: string = "";
  selItemImageUrl: string = "";
  selItemNotes: string = "";
  selItemType: string = "All Students";   //Boy, Girl, All, Class Room
  
  selItemRetail01: string = "";
  selItemRetail02: string = "";
  selItemRetail03: string = "";

  selItemRetail02Name: string = "";
  selItemRetail01Name: string = "";
  selItemRetail03Name: string = "";
  
  


  constructor(private firebasesvc: FirebaseMastItemService, private router: Router) { }

  ngOnInit() {
    this.firebasesvc.getItems().subscribe(items => {
      console.log(items);
      this.itemList = items;

      console.log('this.itemList', this.itemList);
    });
  }

  cloneReset(){
    this.selItemKey = null;
  }

  delItem(key){
    this.firebasesvc.delItem(key);
  }

  selectItem(key){
    
    console.log('key', key)

    this.firebasesvc.getItemDetails(key).subscribe(item => {
      console.log(item)

      this.selItemKey = item.$key;
      this.selectedItem = item;

      this.selItemName = item.itemName;
      this.selItemImageUrl = item.itemImageUrl;  

      this.selItemDesc = item.itemDesc;
      this.selItemQty = item.itemQty;

      this.selItemNotes = item.itemNotes;
      this.selItemType = item.itemType;

      this.selItemRetail01 = item.itemRetail01;
      this.selItemRetail02 = item.itemRetail02;
      this.selItemRetail03 = item.itemRetail03;

      this.selItemRetail01Name = item.itemRetail01Name;
      this.selItemRetail02Name = item.itemRetail02Name;
      this.selItemRetail03Name = item.itemRetail03Name;
    });
    console.log('this.selItemName', this.selItemName);
    
    
  }

  saveItem(){
    let newUpdItem = {
      itemName: this.selItemName,
      itemDesc: this.selItemDesc,
      itemQty: this.selItemQty,
      itemImageUrl: this.selItemImageUrl,
      itemNotes: this.selItemNotes,
      itemType: this.selItemType,

      itemRetail01: this.selItemRetail01,
      itemRetail02: this.selItemRetail02,
      itemRetail03: this.selItemRetail03,

      itemRetail01Name: this.selItemRetail01Name,
      itemRetail02Name: this.selItemRetail02Name,
      itemRetail03Name: this.selItemRetail03Name
    }

    console.log("selItemKey", this.selItemKey)
    if(this.selItemKey){
      this.firebasesvc.updateItem(this.selItemKey, newUpdItem);
    } else {
      this.firebasesvc.addItem(newUpdItem);
    }
  }

  addNewItem(){
    this.selItemKey = "";
    this.selectedItem = null; 

    this.selItemName = "";
    this.selItemDesc = "";
    this.selItemQty = "";
    this.selItemImageUrl = "";
    this.selItemNotes = "";
    this.selItemType = "";

    this.selItemRetail01 = "";
    this.selItemRetail02 = "";
    this.selItemRetail03 = "";

    this.selItemRetail02Name = "";
    this.selItemRetail01Name = "";
    this.selItemRetail03Name = "";
  }

}
