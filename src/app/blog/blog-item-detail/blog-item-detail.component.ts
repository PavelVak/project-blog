import { Component, OnInit } from '@angular/core';
import { Blog } from '../../shared/models/blog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-item-detail',
  templateUrl: './blog-item-detail.component.html',
  styleUrls: ['./blog-item-detail.component.css']
})
export class BlogItemDetailComponent implements OnInit {
  blogDetail: Blog;
  currentKey: string;
  friendBlogKey: string;
  blogDetailDate: string;

  constructor(private route: ActivatedRoute,
              private blogService: BlogService,
              private router: Router,
              private location: Location) {}

  ngOnInit() {
    this.currentKey = this.route.snapshot.params['key'];
    this.friendBlogKey = this.route.snapshot.params['blogItemKey'];
    if(this.friendBlogKey) {
      this.blogService.getBlogBykey(this.friendBlogKey, this.currentKey).subscribe(data => {
        this.blogDetail = data;
        this.blogDetailDate = this.blogService.formatDate(data.blogData);
      });
    } else {
      this.blogService.getBlogBykey(this.currentKey).subscribe(data => {
        this.blogDetail = data;
        this.blogDetailDate = this.blogService.formatDate(data.blogData);
      });
    }
  }


  directBack() {
    this.location.back();
  }

  directEdit() {
    this.router.navigate(['/blog-edit', this.currentKey]);
  }

  deleteBlog() {
    this.blogService.deleteBlogByKey(this.currentKey);
    this.router.navigate(['/blogList']);
  }

}
