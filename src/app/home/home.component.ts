import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 @Input('isLoggedOut') isLoggedOut: boolean;

  constructor() { }

  ngOnInit() {
    this.isLoggedOut = false
  }

  signIn(){
    this.isLoggedOut = !this.isLoggedOut
  }

}
