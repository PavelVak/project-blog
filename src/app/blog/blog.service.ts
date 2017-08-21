import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Blog } from '../shared/models/blog.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BlogService {
  blog: Blog ;
  blogs: FirebaseListObservable<any[]>;
  friendBlogs: FirebaseListObservable<any[]>;
  key: string;
  constructor(private af: AngularFireAuth, private db: AngularFireDatabase, private authService: AuthService) {
    this.key = this.authService.getUid();
    this.blogs = this.db.list('users/' + this.key + '/blogs');
  }

  getAllBlogs(key?: string) {
    if(key) {
      this.friendBlogs = this.db.list('users/' + key + '/blogs');
      return this.friendBlogs.map(
        (data) => data.map(x => x as Blog)
      );
    } else {
      this.key = this.authService.getUid();
      this.blogs = this.db.list('users/' + this.key + '/blogs');
      return this.blogs.map(
        (data) => data.map(x => x as Blog)
      );
    }
  }

  getBlogBykey(key: string, friend?: string) {
    if(!!friend) {
      this.friendBlogs = this.db.list('users/' + friend + '/blogs');
      return this.friendBlogs.map(
        (data) => data.find(x => x.$key == key)
      );
    } else {
      return this.blogs.map(
        (data) => data.find(x => x.$key == key)
      );
    }

  }

  deleteBlogByKey($key: string) {
    this.blogs.remove($key);
  }

  addBlog(blog: Blog) {
    this.key = this.authService.getUid();
    this.blogs = this.db.list('users/' + this.key + '/blogs');
    this.blogs.push(blog);
  }

  editBlog(key: string, authorKey: string,  blog: Blog) {
    this.db.object('users/' + authorKey + '/blogs/' +key).update(blog);

  }

}
