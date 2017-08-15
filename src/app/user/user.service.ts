import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../shared/models/user.model';


@Injectable()
export class UserService{
  user: User ;
  users: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.users = this.db.list('/users');
  }

  getAllUsers() {
    console.log(this.users);
    return this.users.map(
      (data) => data.map(x => x as User)
    ).subscribe(data => console.log(data));
  }

  deleteUserByKey($key: string) {
    this.users.remove($key);
  }

  addUser(user: User) {
    this.users.push(User);
  }

  editUser(key: string, user: User) {
    this.db.object('users/'+key).update(user);
  }

}
