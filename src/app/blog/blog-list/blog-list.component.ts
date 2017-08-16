import { Component, OnInit} from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../../shared/models/blog.model';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  pageTitle: string = 'List of blogs';
  blogList: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(
      data => {this.blogList = data; console.log(this.blogList)}
    );
  }


}
