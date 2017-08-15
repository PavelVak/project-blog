import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignupStep1Component } from './auth/signup/signup-step1/signup-step1.component';
import { SignupStep2Component } from './auth/signup/signup-step2/signup-step2.component';

import { HomeComponent } from './home/home.component';

import { SigninComponent } from './auth/signin/signin.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserService } from './user/user.service';

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
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent, children: [
    {path: '', component: SignupStep1Component},
    {path: 'userData', component: SignupStep2Component},
  ]},
  { path: 'signin', component: SigninComponent },
  { path: 'userprofile', component: UserProfileComponent },
  { path: 'useredit', component: UserEditComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SignupStep1Component,
    SignupStep2Component,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    /*user section*/
    UserProfileComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthService, UserService, AngularFireAuth, AuthGuard, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
