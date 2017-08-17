import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Injectable()
export class FollowersService {
  followers: FirebaseListObservable<any[]>;
  key: string;
  constructor(private af: AngularFireAuth, private db: AngularFireDatabase, private authService: AuthService, private userService: UserService) {
    this.key = this.authService.getUid();
    this.followers = this.db.list('users/' + this.key + '/followers');
  }

  getAllFollowers() {
    this.key = this.authService.getUid();
    this.followers = this.db.list('users/' + this.key + '/followers');
    return this.followers;
  }



  getFollowerBykey(key: string) {
    return this.followers.map(
      (data) => data.find(x => x.$key == key)
    );
  }

  // deleteBlogByKey($key: string) {
  //   this.blogs.remove($key);
  // }

  addFollower(followerKey: string) {
    this.key = this.authService.getUid();
    this.followers = this.db.list('users/' + this.key + '/followers');
    this.followers.push(followerKey);
  }

  // editBlog(key: string, authorKey: string,  blog: Blog) {
  //   this.db.object('users/' + authorKey + '/blogs/' +key).update(blog);
  //
  // }

}
