import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { SignUpModel } from '../shared/models/signup.model';
import { User } from '../shared/models/user.model';

@Injectable()
export class AuthService {
  signUpData: SignUpModel = new SignUpModel();

  user: User ;
  users: FirebaseListObservable<any[]>;

  constructor(private router: Router, private af: AngularFireAuth, private db: AngularFireDatabase) {
    this.users = this.db.list('/users');
  }

  setFirstStepData(email: string, password: string) {
    this.signUpData.email = email;
    this.signUpData.password = password;
    console.log(this.signUpData);
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
            // const userToCreate = {};
            // userToCreate[user.uid] = this.signUpData;
            this.db.object('/users/' + user.uid).update(this.signUpData);
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
        error => alert(error.message)
      );
  }

  signinUser(email: string, password: string) {
    this.af.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          console.log(this.af.auth.currentUser);
          this.af.auth.currentUser.getIdToken()
            .then(
              (token: string) =>  {
                localStorage.setItem('token', token);
                localStorage.setItem('uid', this.af.auth.currentUser.uid);
                localStorage.setItem('email', this.af.auth.currentUser.email);
                localStorage.setItem('displayname', this.af.auth.currentUser.displayName);
              }
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signinGmail() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        response => {
          this.af.auth.currentUser.getIdToken()
            .then(
              (token: string) => {
                localStorage.setItem('token',token)
                localStorage.setItem('uid',this.af.auth.currentUser.uid);
                localStorage.setItem('email',this.af.auth.currentUser.email);
                localStorage.setItem('displayname',this.af.auth.currentUser.displayName);
              }
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    this.af.auth.signOut();
    localStorage.clear();
  }

  getEmail(){
    return localStorage.getItem('email');
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isAuthenticated() {
    return localStorage.getItem('token') != null;
  }

}
