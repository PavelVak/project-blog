import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../../shared/models/blog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {
  @Input() blogItem: Blog;
  @Input() onlyFollow: boolean;
  currentKey: string;
  blogItemContent: string;
  blogItemDate: string;
  authorKey: string;

  constructor(private router: Router, private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    this.authorKey = this.blogItem.authorKey;
    this.currentKey = this.blogItem.$key;
    this.blogItemContent = this.blogService.truncate(this.blogItem.blogContent, 100);
    this.blogItemDate = this.blogService.formatDate(this.blogItem.blogData);
  }

  directToBlogDetail() {
    if (this.onlyFollow) {
      this.router.navigate([this.authorKey, this.currentKey], {relativeTo: this.route});
    } else {
      this.router.navigate([this.currentKey], {relativeTo: this.route});
    }
  }
}
