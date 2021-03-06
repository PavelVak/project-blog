import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { SignUpModel } from '../shared/models/signup.model';
import { User } from '../shared/models/user.model';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  signUpData: SignUpModel = new SignUpModel();
  errorMessage: {[code: string]: string} = {};
  user: User ;
  users: FirebaseListObservable<any[]>;
  private subject = new BehaviorSubject<any>(null);

  sendErrorMessage(errMsg: {[code: string]: string}) {
    this.subject.next(errMsg);
  }
  clearErrorMessage() {
    this.subject.next(null);
  }
  getErrorMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor(private router: Router,
              private af: AngularFireAuth,
              private db: AngularFireDatabase, private userService: UserService) {
    this.users = this.db.list('/users');
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.sendMessage(this.user);
  }

  setFirstStepData(email: string, password: string) {
    this.signUpData.email = email;
    this.signUpData.password = password;
  }

  setPersonalData(displayName: string, firstName: string, lastName: string) {
    this.signUpData.displayName = displayName;
    this.signUpData.firstName = firstName;
    this.signUpData.lastName = lastName;
    this.af.auth.createUserWithEmailAndPassword(this.signUpData.email, this.signUpData.password)
      .then(
        (success) => {
          const user: any = this.af.auth.currentUser;
          user.sendEmailVerification().then(
            (success) => {
              this.db.object('/users/' + user.uid).update(new User(this.signUpData.displayName, this.signUpData.email, this.signUpData.firstName, this.signUpData.lastName));
              console.log('please verify your email');
              alert('please verify your email');
              this.router.navigate(['/signin']);
            }
          ).catch(
            (err) => {
              console.log('Error:' + err);
              alert('Error:' + err);
            }
          );

          user.updateProfile({
            displayName: displayName
          });

        })
      .catch(
        (error: any) => this.errorHandler(error)
      );
  }

  signinUser(email: string, password: string) {
    this.errorMessage = {};
    this.af.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          // this.getCurrentUser().subscribe(() => {this.sendMessage(this.user);});
          this.getCurrentUser().subscribe(() => this.userService.sendMessage(JSON.parse(localStorage.getItem('currentUser'))));
          this.af.auth.currentUser.getIdToken()
            .then(
              (token: string) =>  {
                localStorage.setItem('token', token);
                localStorage.setItem('uid', this.af.auth.currentUser.uid);
              }
            );
        }
      )
      .catch(
        (error: any) => this.errorHandler(error)
      );
  }

  signinGmail() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        response => {
          this.getCurrentUser().subscribe(() => this.userService.sendMessage(JSON.parse(localStorage.getItem('currentUser'))));
          this.af.auth.currentUser.getIdToken()
            .then(
              (token: string) => {
                localStorage.setItem('token', token);
                localStorage.setItem('uid', this.af.auth.currentUser.uid);
                localStorage.setItem('currentUser', JSON.stringify(this.user));
              }
            )
        }
      )
      .catch(
        (error: any) => this.errorHandler(error)
      );
  }

  errorHandler(err) {
    this.errorMessage.code = err.code;
    this.errorMessage.message = err.message;
    this.sendErrorMessage(this.errorMessage);
  }

  logout() {
    this.af.auth.signOut();
    localStorage.clear();
    this.userService.clearMessage();
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUid() {
    return localStorage.getItem('uid');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(){
    const key = this.af.auth.currentUser.uid;
    return this.users.map(
      (data) => data.map(x => x as User).filter(x => x.$key == key)
    ).map(data => {this.user = new User(data[0].displayName, data[0].email, data[0].firstName, data[0].lastName); localStorage.setItem('currentUser', JSON.stringify(this.user));});
  }

  editCurrentUser(user: User){
    const key = this.af.auth.currentUser.uid;
    this.db.object('users/'+ key).update(user);
    this.user = user;
    const currentEmail = this.af.auth.currentUser.email;
    if(currentEmail !== this.user.email){
      this.af.auth.currentUser.updateEmail(this.user.email).then(function() {
        console.log('email update');
      }).catch(function(error) {
        console.log('email not update');
      });
    }
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    this.userService.sendMessage(this.user);
  }
}
