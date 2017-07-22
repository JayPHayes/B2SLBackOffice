import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseClassRoomService {
  classRoom: FirebaseObjectObservable<ClassRoom>
  classRoomList: FirebaseListObservable<ClassRoom[]>
  classRoomItemList: FirebaseListObservable<ClassItem[]>


  constructor(private db: AngularFireDatabase) { 
    
  }

  delClassRoom(key){
    return this.classRoomList.remove(key);
  }

  getClassRoomItems(schoolKey, classKey){
    let fbSchoolPath:String = environment.FB_NODE_SCHOOL.name + "/" + schoolKey + "/"
    let fbClassRoomPath: String =  fbSchoolPath + environment.FB_NODE_CLASSROOM.name + "/" + classKey + "/"
    let fbClassRoomItemsPath: string = fbClassRoomPath + environment.FB_NODE_CLASSROOM.FB_ITEM_CLASSRM.ITEM_ClassItemList

    this.classRoomItemList = this.db.list(fbClassRoomItemsPath) as FirebaseListObservable<ClassItem[]>;
    return this.classRoomItemList
  }


  addClassRoomItem(schoolKey, classKey, newItem){
    let fbSchoolPath:String = environment.FB_NODE_SCHOOL.name + "/" + schoolKey + "/"
    let fbClassRoomPath: String =  fbSchoolPath + environment.FB_NODE_CLASSROOM.name + "/" + classKey + "/"
    let fbClassRoomItemsPath: string = fbClassRoomPath + environment.FB_NODE_CLASSROOM.FB_ITEM_CLASSRM.ITEM_ClassItemList

    let classRoomItemList = this.db.list(fbClassRoomItemsPath) as FirebaseListObservable<ClassItem>;
    return  classRoomItemList.push(newItem);
  }

  updateClassRoom(key, classRm){
    console.log("classRm", classRm);

    return this.classRoomList.update(key, classRm);
  }

  addClassRoom(newClassRm){
    console.log('newClassRm', newClassRm);
    return  this.classRoomList.push(newClassRm);
  }

  getClassRmDetails(schoolKey, key){
    let fbClassRoom: string = environment.FB_NODE_SCHOOL.name + "/" + schoolKey + "/" + environment.FB_NODE_CLASSROOM.name + "/" + key
    this.classRoom = this.db.object(fbClassRoom) as FirebaseObjectObservable<ClassRoom>;

    return this.classRoom
  }

  getClassRooms(schoolKey){
    let fbClassRoom: string = environment.FB_NODE_SCHOOL.name + "/" + schoolKey + "/" + environment.FB_NODE_CLASSROOM.name
    this.classRoomList = this.db.list(fbClassRoom, {
      query: {
        orderByChild: environment.FB_NODE_CLASSROOM.FB_ITEM_CLASSRM.ITEM_SortKey
      }
    }) as FirebaseListObservable<ClassRoom[]>

    return this.classRoomList;
  }


}

interface ClassItem {
  $key?: string;
  itemName?: string;
  itemDesc?: string;
  itemQty?: string;
  itemImageUrl?: string;
  itemNotes?: string;
  itemType?: string;
  itemRetail01?: string;
  itemRetail01Name?: string;
  itemRetail02?: string;
  itemRetail02Name?: string;
  itemRetail03?: string;
  itemRetail03Name?: string;
      
}

interface ClassRoom {
  $key?: string;
  schoolKey: string,
  name?: string;
  namelong?: string;
  nameShort?: string;
  classNotes?: string;
  
}