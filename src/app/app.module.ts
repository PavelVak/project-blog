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
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { BlogModule } from './blog/blog.module';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { UserModule } from './user/user.module';

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
  { path: '', redirectTo: '/blogList', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, children: [
    {path: '', component: SignupStep1Component},
    {path: 'userData', component: SignupStep2Component},
  ]},
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SignupStep1Component,
    SignupStep2Component,
    SignupComponent,
    SigninComponent
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
    BlogModule,
    UserModule
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthService, AngularFireAuth, AuthGuard, AngularFireDatabase, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
