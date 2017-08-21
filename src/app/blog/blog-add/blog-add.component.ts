import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from '../../validators/generic-validator';
import { Observable } from 'rxjs/Observable';
import { BlogService } from '../blog.service';
import { Blog } from '../../shared/models/blog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string = 'Add Blog';
  blogAddForm: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private blogService: BlogService, private router: Router) {
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
    this.blogAddForm = this.fb.group({
      blogHead: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      blogContent: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.blogAddForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.blogAddForm);
    });
  }

  submitFormData() {
    const head: string = this.blogAddForm.get('blogHead').value;
    const content: string = this.blogAddForm.get('blogContent').value;
    const date = new Date().toString();
    const blog: Blog = new Blog(head, content, date);
    this.blogService.addBlog(blog);
    this.router.navigate(['/blogList']);
  }

}
