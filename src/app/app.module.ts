import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RequestComponent } from './inventory/request/request.component';
import { ManageComponent } from './inventory/manage/manage.component';
import { ApproveComponent } from './inventory/approve/approve.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { InventoryService } from './inventory/inventory.service';

import { AlertModule } from 'ngx-bootstrap';
import { AddComponent } from './inventory/add/add.component';

// Initialize Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyA3E1FiQIvV_DwYVfL__YN2_ZwytkU7gz4',
  authDomain: 'blog-app-e334c.firebaseapp.com',
  databaseURL: 'https://blog-app-e334c.firebaseio.com',
  projectId: 'blog-app-e334c',
  storageBucket: 'blog-app-e334c.appspot.com',
  messagingSenderId: '623802670833'
};

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "manage", component: ManageComponent, canActivate: [AuthGuard]},
  { path: "request", component: RequestComponent, canActivate: [AuthGuard] },
  { path: "approve", component: ApproveComponent, canActivate: [AuthGuard] },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "add", component: AddComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    RequestComponent,
    ManageComponent,
    ApproveComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AlertModule.forRoot(),
  ],
  providers: [AuthService, AngularFireAuth, AuthGuard, AngularFireDatabase, InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
