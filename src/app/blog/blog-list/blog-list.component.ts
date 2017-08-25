import { Component, OnInit} from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../../shared/models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user.service';
import { FollowersService } from '../../user/followers.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  onlyFollowers: boolean;
  pageTitle = 'List of blogs';
  blogList: Blog[] = [];
  key: string;
  displayName: string;
  sortDirection: boolean;

  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private userService: UserService,
              private followersService: FollowersService) {
    this.onlyFollowers = this.route.snapshot.data['onlyFollowers'];
    this.sortDirection = false;
  }

  ngOnInit() {
    if(this.onlyFollowers) {
      let keyArr: string[] = [];
      this.followersService.getAllFollowers().subscribe(data => {
        keyArr = data.map(item => item.$value);
        this.blogList = [];
        if (keyArr.length > 0) {
          keyArr.forEach((key) => {
            this.userService.getUserByKey(key).subscribe(userData => {
              const authorName = userData[0].displayName;
              const authorKey = key;
              const sub = this.blogService.getAllBlogs(key).subscribe(data => {
                const blogs = data.map(item => {
                  item.authorName = authorName;
                  item.authorKey = authorKey;
                  return item;
                });
                this.blogList.push(...blogs);
                sub.unsubscribe();
              });
            });
          });
        }
      });
    } else {
      this.blogService.getAllBlogs(this.key).subscribe(data => this.blogList = data);
      if (this.route.snapshot.params['key']) {
        this.key = this.route.snapshot.params['key'];
        this.blogService.getAllBlogs(this.key).subscribe(data => this.blogList = data);
        this.userService.getUserByKey(this.key).subscribe(data => this.displayName = data[0].displayName);
      }
    }
  }

  onSort() {
    this.blogList.sort(this.sortFunction());
  }

  sortFunction() {
    const mod = this.sortDirection ? 1 : -1;
    this.sortDirection = !this.sortDirection;
    return function (a: Blog, b: Blog) {
      const dateA = new Date(a.blogData).getTime();
      const dateB = new Date(b.blogData).getTime();
      return dateA > dateB ? 1 * mod : -1 * mod;
    };
  }
}
