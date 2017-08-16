import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from '../../validators/generic-validator';
import { Observable } from 'rxjs/Observable';
import { BlogService } from '../blog.service';
import { Blog } from '../../shared/models/blog.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string = 'Edit Blog';
  blogDetail: Blog;
  blogEditForm: FormGroup;
  currentKey: string;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private blogService: BlogService, private router: Router, private route: ActivatedRoute) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      blogHead: {
        required: 'Blog Head is required',
        minlength: 'Blog Head must be at least three characters.',
        maxlength: 'Blog Head cannot exceed 100 characters.'
      },
      blogContent: {
        required: 'Blog Content is required',
        minlength: 'Blog Content must be at least three characters.',
      }
    };
    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.blogEditForm = this.fb.group({
      blogHead: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      blogContent: [null, [Validators.required, Validators.minLength(3)]],
    });

    this.currentKey = this.route.snapshot.params['key'];
    this.blogService.getBlogBykey(this.currentKey).subscribe(data => {
      this.blogDetail = data;
      this.blogEditForm.patchValue({
        blogHead: this.blogDetail.blogHead,
        blogContent: this.blogDetail.blogContent,
      })
    });
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.blogEditForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.blogEditForm);
    });
  }

  directBack() {
    this.router.navigate(['blogList', this.currentKey]);
  }

  submitFormData(){
    const head: string = this.blogEditForm.get('blogHead').value;
    const content: string = this.blogEditForm.get('blogContent').value;
    const date = new Date().toString();
    const blog: Blog = new Blog(head, content, date);
    const authorKey = localStorage.getItem('uid');
    this.blogService.editBlog(this.currentKey, authorKey, blog);
    this.router.navigate(['/blogList', this.currentKey]);
  }

}
