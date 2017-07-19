import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  isDisplay: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  editSchool(){
    console.log('Edit School')
    this.isDisplay = !this.isDisplay
  }

}
