import { Component, OnInit} from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../../shared/models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  pageTitle: string = 'List of blogs';
  blogList: Blog[] = [];
  key: string;
  displayName: string;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.blogService.getAllBlogs(this.key).subscribe(data => this.blogList = data);
    if (this.route.snapshot.params['key']) {
      this.key = this.route.snapshot.params['key'];
      this.blogService.getAllBlogs(this.key).subscribe(data => this.blogList = data);
      this.userService.getUserByKey(this.key).subscribe(data => this.displayName = data[0].displayName);
    }

  }
}
