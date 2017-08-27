import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from '../shared/models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService{
  user: User ;
  users: FirebaseListObservable<any[]>;
  private subject = new BehaviorSubject<any>(null);
  constructor(private db: AngularFireDatabase) {
    this.users = this.db.list('/users');
  }

  getAllUsers() {
    return this.users.map(
      (data) => data.map(x => x as User)
    );
  }

  getUserByKey(key) {
    return this.users.map(
      (data) => data.map(x => x as User).filter(x => x.$key === key)
    );
  }

  sendMessage(user: User) {
    this.subject.next(user);
  }

  clearMessage() {
    this.subject.next(null);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }



  deleteUserByKey($key: string) {
    this.users.remove($key);
  }

  addUser(user: User) {
    this.users.push(User);
  }

  editUser(key: string, user: User) {
    this.db.object('users/'+ key).update(user);
  }

}
