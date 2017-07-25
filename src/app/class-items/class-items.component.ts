import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { FirebaseClassRoomService } from './../services/firebase-class-room.service';
import { FirebaseService } from './../services/firebase.service';
import { FirebaseMastItemService } from './../services/firebase-mast-item.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Router } from '@angular/router'
import { FilterPipe } from './../pipes/filter.pipe';
import { SearchPipe } from './../pipes/search.pipe';

@Component({
  selector: 'app-class-items',
  templateUrl: './class-items.component.html',
  styleUrls: ['./class-items.component.css']
})
export class ClassItemsComponent implements OnInit {
  schoolList: any;
  classRmList: any;
  itemList: any;
  classRmItemList: any;
  updatedQty: string = "";
  

  selClassRoomItemKey: any;


  isSelected: boolean = false;
  isDisplay: boolean = true;
  isGradSchool: boolean = false;

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
  

  //Selected ClassRoom data  
  selClassRm: any;
  selClassRmNameLong: string = "";
  selClassRmNameShort: string = ""; 
  selClassRmName: string = "";
  selClassRmKey: string = "";
  selClassRmSchoolKey: string = "";
  selClassRmNotes: string = "";
  selClassRmSort: number = 100


  //Selected School data
  selectedKey: any;
  selectedSchool: any;
  selSchoolName: string = "";
  selSchoolAddress: string = "";
  selSchoolPhone: string = "";
  selSchoolCounty: string = "";
  selSchoolGrades: string = "";
  selSchoolWeb: string = "";
  selSchoolImage: string = "";

  constructor(private firebaseSvc:FirebaseService, private firebaseClassRoomSvc: FirebaseClassRoomService, private firebaseMastItemSvc: FirebaseMastItemService) { }

  ngOnInit() {
     this.firebaseSvc.getSchools().subscribe(school => {
      this.schoolList = school
    });

    this.firebaseMastItemSvc.getItems().subscribe(items => {
      this.itemList = items;
    });



  }


  resetSelClassRm(){
    this.selClassRm = "";
    this.selClassRmNameLong = "";
    this.selClassRmNameShort = "";
    this.selClassRmName = "";
    this.selClassRmKey = "";
    this.selClassRmSchoolKey = "";
    this.selClassRmNotes = "";
    
  }

  quickSave(classRm, SortKey){
    this.selClassRmName = classRm
    this.selClassRmNotes = "."
    this.selClassRmSort = SortKey;

    let updateClassRm = {
      name : this.selClassRmName,
      schoolKey: this.selectedKey,
      classNotes: this.selClassRmNotes, 
      sortKey: this.selClassRmSort + this.selClassRmName
    }

    this.firebaseClassRoomSvc.addClassRoom(updateClassRm);
     
  }

  saveClass(f)
  {
    let updateClassRm = {
      name : this.selClassRmName,
      schoolKey: this.selectedKey,
      classNotes: this.selClassRmNotes 
    }

    if(this.selClassRmKey){
      this.firebaseClassRoomSvc.updateClassRoom(this.selClassRmKey, updateClassRm);
    } else {
      this.firebaseClassRoomSvc.addClassRoom(updateClassRm)
    }


    this.isDisplay = !this.isDisplay;
  }

  addClass(){
    this.resetSelClassRm();
    this.isDisplay = !this.isDisplay;
    
  }

  editClass(){
    this.isDisplay = !this.isDisplay;
  }


  selectClassRoomItemkey(key){
    this.selClassRoomItemKey = key;
  }
  setQty(key){
    // this.selClassRoomItemKey = key;

    let classRmItemQty = {
      qty: this.updatedQty
    }

    this.firebaseClassRoomSvc.setQty(key, classRmItemQty)
  }

  setItemType(key, itemTypeBGC){
    this.selClassRoomItemKey = key;

    let classRmType = {
      itemType: itemTypeBGC,
      sortKey: itemTypeBGC + this.selItemName
    }

    this.firebaseClassRoomSvc.setClassRoomType(key, classRmType)
  }
  selectItem(key){
    
    this.firebaseMastItemSvc.getItemDetails(key).subscribe(item => {
    
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
    
    
    let updateClassRm = {
      name : this.selItemName,
      imageUrl : this.selItemImageUrl,
      qty: this.selItemQty,
      isChecked: "0",
      itemType: "00 ",
      sortKey: "00 " + this.selItemName,
      notes01: this.selItemNotes

    }

    this.firebaseClassRoomSvc.addClassRoomItem(this.selectedKey, this.selClassRmKey, updateClassRm);
  }

  selectClass(schoolKey,  key){
    this.firebaseClassRoomSvc.getClassRmDetails(schoolKey, key).subscribe(classRm => {
      this.selClassRm = classRm;

      this.selClassRmName = classRm.name;
      this.selClassRmKey = classRm.$key;
      this.selClassRmSchoolKey = classRm.schoolKey;
      this.selClassRmNotes = classRm.classNotes;
      this.selClassRmNameLong = classRm.namelong;
      this.selClassRmNameShort = classRm.nameShort;
      
     this.firebaseClassRoomSvc.getClassRoomItems(this.selectedKey, this.selClassRmKey).subscribe(classItems => {
       this.classRmItemList = classItems
     });
    });
  }

  delItem(key){
    console.log('key: ', key)
    this.firebaseClassRoomSvc.delClassItem(key)
  }
  

  selectSchool(key){
    
    this.isSelected = !this.isSelected;

    this.firebaseClassRoomSvc.getClassRooms(key).subscribe(classRms => {
      this.classRmList = classRms
    });


    this.firebaseSvc.getSchoolDetails(key).subscribe(school => {
      this.selectedSchool = school;
      this.selectedKey = school.$key
      this.selSchoolName = school.name
      this.selSchoolAddress = school.address
      this.selSchoolImage = school.image
      this.selSchoolWeb  = school.webSite
      this.selSchoolPhone = school.phone
    });
    this.resetSelClassRm();
  }



}
