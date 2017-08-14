import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(private router: Router, private af: AngularFireAuth) { }

  signupUser(email: string, password: string, username: string) {
    this.af.auth.createUserWithEmailAndPassword(email, password)
      .then(
        (success) => {
          let user:any = this.af.auth.currentUser;
          user.sendEmailVerification().then(
            (success) => {
              console.log("please verify your email");
              alert("please verify your email");
              this.router.navigate(['/signin']);
            }
          ).catch(
            (err) => {
              console.log("Error:" + err);
              alert("Error:" + err);
            }
          )

          user.updateProfile({
            displayName: username
          })

        })
      .catch(
        error => alert(error.message)
      );

  }

  signinUser(email: string, password: string) {
    this.af.auth.signInWithEmailAndPassword(email,password)
      .then(
        response => {
          this.router.navigate(['/']);
          this.af.auth.currentUser.getIdToken()
            .then(
              (token: string) =>  {
                localStorage.setItem('token',token);
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
