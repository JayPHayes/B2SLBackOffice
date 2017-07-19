import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  school: FirebaseObjectObservable<School>
  schoolList: FirebaseListObservable<any[]>

  FB_NODE = {
    name:  "/schools",
    FB_ITEM_SCHOOL: {
      ITEM_KEY: "key",
      ITEM_NAME: "name",
      ITEM_Address: "address",
      ITEM_note01: "notes01",
      ITEM_Image: "image"
    }
  }
  
  constructor(private db: AngularFireDatabase) { 
    // this.schoolList = this.db.list(this.FB_NODE.name) as FirebaseListObservable<School[]>;  
    this.schoolList = this.db.list(this.FB_NODE.name, {
      query: {
        orderByChild: this.FB_NODE.FB_ITEM_SCHOOL.ITEM_NAME
      }
    }) as FirebaseListObservable<School[]>;  
  }

  delSchool(key){
    return this.schoolList.remove(key);
  }

  addSchool(newSchool){
    console.log('newSchool: ', newSchool)
    return this.schoolList.push(newSchool)
  }

  updateSchool(key, school){
    console.log('SCHOOL: ', school)

    return this.schoolList.update(key, school)
  }

  getSchools(){
    return this.schoolList;
  }

  getSchoolDetails(key){
    this.school = this.db.object(this.FB_NODE.name + '/' + key) as FirebaseObjectObservable<School>

    return this.school
  }


}


interface School {
  $key?: string;
  name?: string;
  image?: string;
  address?: string;
  phone?: string;
  webSite?: string;
  logo?: string;
  note01?: string;
  note02?: string;
      
}