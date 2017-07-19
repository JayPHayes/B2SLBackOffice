// import { FirebaseService } from './../serservices/firebase.service';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';



@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  isDisplay: boolean = false;
  selectedKey: any;
  selectedSchool: any;


  selSchoolName: string = "";
  selSchoolAddress: string = "";
  selSchoolPhone: string = "";
  selSchoolCounty: string = "";
  selSchoolGrades: string = "";
  selSchoolWeb: string = "http://www.shelbyed.k12.al.us/schools/mtles/";
  selSchoolImage: string = "http://via.placeholder.com/350/200";
  // selSchoolImage: string = "http://lorempixel.com/350/200/";
  // selSchoolImage: string = "http://www.shelbyed.k12.al.us/schools/mtles/images/slide-mles.jpg";



  schoolList: any;
  constructor(private firebaseSvc:FirebaseService) { }

  ngOnInit() {
    this.firebaseSvc.getSchools().subscribe(school => {
      // console.log(schools);

      this.schoolList = school

      console.log(this.schoolList)
    });
  }

  delSchool(key){
    this.firebaseSvc.delSchool(key)
  }

  addNewSchool(){
    console.log('ADD School')
    this.isDisplay = !this.isDisplay

    this.selectedSchool = "";
    this.selectedKey = "";
    this.selSchoolName = "";
    this.selSchoolAddress = "";
    this.selSchoolImage = ""

    
  }
  editSchool(){
    console.log('Edit School')
    this.isDisplay = !this.isDisplay
    
  }

  saveSchool(f){
    // console.log('Save School: ', f.value)
    
    let updSchool = {
      name: this.selSchoolName,
      address: this.selSchoolAddress,
      phone: this.selSchoolPhone,
      webSite: this.selSchoolWeb,
      image: this.selSchoolImage,
      county: this.selSchoolCounty  
    }
    
    console.log('updSchool: ', updSchool)
    if(this.selectedKey){
      this.firebaseSvc.updateSchool(this.selectedKey, updSchool);
    } else {
      this.firebaseSvc.addSchool(updSchool)
    }
    
  }
  setImage(newImage){
    this.selSchoolImage = newImage
  }

  selectSchool(key){
    console.log('key: ', key)
    this.firebaseSvc.getSchoolDetails(key).subscribe(school => {
      this.selectedSchool = school;
      this.selectedKey = school.$key
      this.selSchoolName = school.name
      this.selSchoolAddress = school.address
      this.selSchoolImage = school.image
      console.log("this.selectedSchool: ", this.selectedSchool)
    });
  }

}
















