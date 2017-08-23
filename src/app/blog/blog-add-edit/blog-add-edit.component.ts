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
  }

  ngOnInit() {
    if (this.isEdit) {
      this.pageTitle = 'Edit Blog';
      this.currentKey = this.route.snapshot.params['key'];
      this.blogService.getBlogBykey(this.currentKey).subscribe(blog => this.blogDetail = blog);
    } else {
      this.pageTitle = 'Add Blog';
      this.blogDetail = new Blog();
    }
  }

}
