import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-items',
  templateUrl: './master-items.component.html',
  styleUrls: ['./master-items.component.css']
})
export class MasterItemsComponent implements OnInit {

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
  
  


  constructor() { }

  ngOnInit() {
  }

}
