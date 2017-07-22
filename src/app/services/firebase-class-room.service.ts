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


  constructor(private db: AngularFireDatabase) { 
    
  }

  delClassRoom(key){
    return this.classRoomList.remove(key);
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

interface ClassRoom {
  $key?: string;
  schoolKey: string,
  name?: string;
  namelong?: string;
  nameShort?: string;
  classNotes?: string;
  
}