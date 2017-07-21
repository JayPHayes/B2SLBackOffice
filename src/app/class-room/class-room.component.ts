import { FirebaseClassRoomService } from './../services/firebase-class-room.service';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Router } from '@angular/router'

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.css']
})
export class ClassRoomComponent implements OnInit {
  schoolList: any;
  classRmList: any;

  isSelected: boolean = false;

  //Selected ClassRoom data  
  selClassRm: any;
  selClassRmNameLong: string = "";
  selClassRmNameShort: string = ""; 
  selClassRmName: string = "";
  selClassRmKey: string = "";
  selClassRmSchoolKey: string = "";
  selClassRmNotes: string = "";


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

  constructor(private firebaseSvc:FirebaseService, private firebaseClassRoomSvc: FirebaseClassRoomService) { }

  ngOnInit() {
     this.firebaseSvc.getSchools().subscribe(school => {
      // console.log(schools);

      this.schoolList = school

      console.log(this.schoolList)
    });
  }

  selectClass(schoolKey,  key){
    console.log('key: ', key)
    console.log('schoolKey: ',schoolKey)

    this.firebaseClassRoomSvc.getClassRmDetails(schoolKey, key).subscribe(classRm => {
      this.selClassRm = classRm;

      this.selClassRmName = classRm.name;
      this.selClassRmKey = classRm.$key;
      this.selClassRmSchoolKey = classRm.schoolKey;
      this.selClassRmNotes = classRm.note01;
      this.selClassRmNameLong = classRm.namelong;
      this.selClassRmNameShort = classRm.nameShort;
      

      console.log("this.selClassRm: ", this.selClassRm);
    });
  }
  selectSchool(key){
    console.log('key: ', key)

    this.isSelected = !this.isSelected;
    // console.log('this.isSelected;: ', this.isSelected);

    this.firebaseClassRoomSvc.getClassRooms(key).subscribe(classRms => {
      // console.log("XXX classRm: ", classRms);
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
      console.log("class Rooms: ", this.selectedSchool.classrooms)
    });
  }

}
