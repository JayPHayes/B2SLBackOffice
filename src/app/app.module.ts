import { FirebaseClassRoomService } from './services/firebase-class-room.service';
import { environment } from './../environments/environment';
import { SchoolsComponent } from './schools/schools.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseService } from './services/firebase.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassRoomComponent } from './class-room/class-room.component';
import { ClassItemsComponent } from './class-items/class-items.component';
import { MasterItemsComponent } from './master-items/master-items.component';
import { LoginComponent } from './login/login.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';

const appRoutes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent}, 
  {path: 'dashboard', component:DashboardComponent},
  {path: 'schools', component:SchoolsComponent},
  {path: 'classrooms', component:ClassRoomComponent},
  {path: 'classitems', component:ClassItemsComponent},
  {path: 'masteritems', component:MasterItemsComponent},
  {path: '**', component:InvalidPageComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SchoolsComponent,
    DashboardComponent,
    ClassRoomComponent,
    ClassItemsComponent,
    MasterItemsComponent,
    LoginComponent,
    InvalidPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule, 

    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService, FirebaseClassRoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
