import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class FollowersService {
  followers: FirebaseListObservable<any[]>;
  key: string;
  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
    this.key = this.authService.getUid();
    this.followers = this.db.list('users/' + this.key + '/followers');
  }
  getAllFollowers() {
    this.key = this.authService.getUid();
    this.followers = this.db.list('users/' + this.key + '/followers');
    return this.followers;
  }
  deleteFollowerByKey($key: string) {
    this.followers.remove($key);
  }
  addFollower(followerKey: string) {
    this.key = this.authService.getUid();
    this.followers = this.db.list('users/' + this.key + '/followers');
    this.followers.push(followerKey);
  }
}
