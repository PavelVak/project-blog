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
  currentKey: string;

  constructor(private router: Router, private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    this.currentKey = this.blogItem.$key;
  }

  directToBlogDetail() {
    this.router.navigate([this.currentKey], {relativeTo: this.route});
  }

}
