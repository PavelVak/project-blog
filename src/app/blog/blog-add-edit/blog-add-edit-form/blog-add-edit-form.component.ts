import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../../../shared/models/blog.model';

@Component({
  selector: 'app-blog-add-edit-form',
  templateUrl: './blog-add-edit-form.component.html',
  styleUrls: ['./blog-add-edit-form.component.css']
})
export class BlogAddEditFormComponent implements OnInit {
  @Input() state: boolean;
  @Input() blog: Blog;
  blogForm: FormGroup;
  constructor (private fb: FormBuilder) {}

  ngOnInit() {
    this.blogForm = this.fb.group({
      blogHead: [this.blog.blogHead, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      blogContent: [this.blog.blogContent, [Validators.required, Validators.minLength(3)]],
    });
  }
}
