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
import { BlogModule } from './blog/blog.module';
import { BlogAddComponent } from './blog/blog-add/blog-add.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogItemDetailComponent } from './blog/blog-item-detail/blog-item-detail.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { FollowersService } from './user/followers.service';
import { BlogAddEditComponent } from './blog/blog-add-edit/blog-add-edit.component';
import { BlogResolverService } from './blog/blog-resolver.service';

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
  { path: 'userprofile', component: UserProfileComponent },
  { path: 'userEdit', component: UserEditComponent },
  { path: 'users-list', component: UsersListComponent, data: {onlyFollowers: false} },
  { path: 'friends-list', component: UsersListComponent, data: {onlyFollowers: true}},
  { path: 'blogAdd', component: BlogAddComponent },
  { path: 'blogList', component: BlogListComponent},
  { path: 'blogList/friend/:key', component: BlogListComponent},
  { path: 'blogList/:key', component: BlogItemDetailComponent},
  { path: 'blogList/friend/:key/:blogItemKey', component: BlogItemDetailComponent},
  { path: 'blogEdit/:key', component: BlogEditComponent},



  { path: 'blog-edit/:key', component: BlogAddEditComponent, resolve: { blog: BlogResolverService}},
  { path: 'blog-add', component: BlogAddEditComponent, data: {isEdit: false}},
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
    UsersListComponent,
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
    BlogModule
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthService, UserService, FollowersService, AngularFireAuth, AuthGuard, AngularFireDatabase, BlogResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
