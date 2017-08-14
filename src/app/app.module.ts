import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignupStep1Component } from './auth/signup/signup-step1/signup-step1.component';
import { SignupStep2Component } from './auth/signup/signup-step2/signup-step2.component';



import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { SigninComponent } from './auth/signin/signin.component';
import { RequestComponent } from './inventory/request/request.component';
import { ManageComponent } from './inventory/manage/manage.component';
import { ApproveComponent } from './inventory/approve/approve.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { InventoryService } from './inventory/inventory.service';

import { AddComponent } from './inventory/add/add.component';
import {
  MaterialModule, MdAutocompleteModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule,
  MdChipsModule, MdCoreModule, MdDatepickerModule, MdDialogModule, MdExpansionModule, MdGridListModule,
  MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdNativeDateModule, MdPaginatorModule, MdProgressBarModule,
  MdProgressSpinnerModule, MdRadioModule, MdRippleModule, MdSelectModule,
  MdSidenavModule, MdSliderModule, MdSlideToggleModule, MdSnackBarModule, MdSortModule, MdTableModule, MdTabsModule,
  MdToolbarModule, MdTooltipModule
} from '@angular/material';



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
    {path: 'step1', component: SignupStep1Component},
    {path: 'step2', component: SignupStep2Component},
  ]},
];

@NgModule({
  declarations: [
    AppComponent,
    SignupStep1Component,
    SignupStep2Component,
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
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    /*Material section*/
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  ],
  providers: [AuthService, AngularFireAuth, AuthGuard, AngularFireDatabase, InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
