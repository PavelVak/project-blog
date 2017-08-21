import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Blog } from '../../shared/models/blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-add-edit',
  templateUrl: './blog-add-edit.component.html',
  styleUrls: ['./blog-add-edit.component.css']
})
export class BlogAddEditComponent implements OnInit {
  isEdit: boolean;
  pageTitle: string;
  blogDetail: Blog;
  currentKey: string;

  constructor(private blogService: BlogService, private route: ActivatedRoute){
    this.isEdit = this.route.snapshot.data['isEdit'];
    this.isEdit = true;
  }

  ngOnInit() {
    if (this.isEdit) {
      this.pageTitle = 'Edit Blog';
      this.route.data.subscribe((data: Data) => this.blogDetail = data['blog']);
    } else {
      this.pageTitle = 'Add Blog';
      this.blogDetail = new Blog();
    }
  }

}
