import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Blog } from '../shared/models/blog.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BlogService {
  blog: Blog ;
  blogs: FirebaseListObservable<any[]>;
  key: string;
  constructor(private af: AngularFireAuth, private db: AngularFireDatabase, private authService: AuthService) {
    this.key = this.authService.getUid();
    this.blogs = this.db.list('users/' + this.key + '/blogs');
  }

  getAllBlogs() {
    return this.blogs.map(
      (data) => data.map(x => x as Blog)
    );
  }

  addBlog(blog: Blog) {
   this.blogs.push(blog);
  }

}
