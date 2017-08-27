import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../../../shared/models/blog.model';
import { BlogService } from '../../blog.service';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from '../../../can-deactivate-guard.service';

@Component({
  selector: 'app-blog-add-edit-form',
  templateUrl: './blog-add-edit-form.component.html',
  styleUrls: ['./blog-add-edit-form.component.css']
})
export class BlogAddEditFormComponent implements OnInit {
  @Input() state: boolean;
  @Input() blog: Blog;
  blogForm: FormGroup;
  currentKey: string;
  @Output() submitState = new EventEmitter<boolean>();
  constructor (private fb: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private blogService: BlogService) {

    const date = new Date().toString();
    const now = moment(date);

    console.log('hello world', now.format('MMMM Do YYYY, h:mm:ss a'));
  }

  ngOnInit() {
    if (this.state) {
      this.currentKey = this.route.snapshot.params['key'];
    }
    this.blogForm = this.fb.group({
      blogHead: [this.blog.blogHead, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      blogContent: [this.blog.blogContent, [Validators.required, Validators.minLength(3)]],
    });
  }
  submitFormData() {
    const head: string = this.blogForm.get('blogHead').value;
    const content: string = this.blogForm.get('blogContent').value;
    const date = new Date().toString();
    const blog: Blog = new Blog(head, content, date);
    this.submitState.emit();
    if (this.state) {
      const authorKey = localStorage.getItem('uid');
      this.blogService.editBlog(this.currentKey, authorKey, blog);
      this.router.navigate(['/blogList', this.currentKey]);
    } else {
      this.blogService.addBlog(blog);
      this.router.navigate(['/blogList']);
    }
  }
  directBack() {
    this.router.navigate(['blogList', this.currentKey]);
  }
}
