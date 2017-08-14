import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericValidator } from '../../../validators/generic-validator';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signup-step1',
  templateUrl: './signup-step1.component.html',
  styleUrls: ['./signup-step1.component.css']
})
export class SignupStep1Component implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle: string = 'Step 1';
  signUpFormStep1: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private router: Router) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      email: {
        required: 'Email is required.',
        pattern: 'Please enter a valid email address',
      },
      password: {
        required: 'Password is required',
        minlength: 'Password must be at least three characters.',
        maxlength: 'Password cannot exceed 10 characters.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

  }


  ngOnInit() {
    this.signUpFormStep1 = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    });
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.signUpFormStep1.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.signUpFormStep1);
    });
  }

  submitFormData() {
    console.log('переход на второй шаг');
    this.router.navigate(['/signup/userData']);
  }
}
