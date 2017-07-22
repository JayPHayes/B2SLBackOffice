import { environment } from './../../environments/environment';
import { FirebaseClassRoomService } from './../services/firebase-class-room.service';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit, enableProdMode } from '@angular/core';
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
  isDisplay: boolean = true;
  isGradSchool: boolean = false;

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

  constructor(private firebaseSvc:FirebaseService, private firebaseClassRoomSvc: FirebaseClassRoomService) { }

  ngOnInit() {
     this.firebaseSvc.getSchools().subscribe(school => {
      // console.log(schools);

      this.schoolList = school

      console.log(this.schoolList)
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

    console.log(updateClassRm)
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

  selectClass(schoolKey,  key){
    console.log('key: ', key)
    console.log('schoolKey: ',schoolKey)

    this.firebaseClassRoomSvc.getClassRmDetails(schoolKey, key).subscribe(classRm => {
      this.selClassRm = classRm;

      this.selClassRmName = classRm.name;
      this.selClassRmKey = classRm.$key;
      this.selClassRmSchoolKey = classRm.schoolKey;
      this.selClassRmNotes = classRm.classNotes;
      this.selClassRmNameLong = classRm.namelong;
      this.selClassRmNameShort = classRm.nameShort;
      

      console.log("this.selClassRm: ", this.selClassRm);
    });
  }

  delClassRm(key){
    this.firebaseClassRoomSvc.delClassRoom(key);
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

    console.log('resetSelClassRm();');
    this.resetSelClassRm();
  }

}
