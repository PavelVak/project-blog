import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from '../../../validators/generic-validator';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrls: ['./signup-step2.component.css']
})
export class SignupStep2Component implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle: string = 'Step 2';
  signUpFormStep2: FormGroup;
  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      displayName: {
        required: 'DispalayName is required',
        minlength: 'DisplayName must be at least three characters.',
        maxlength: 'DisplayName cannot exceed 10 characters.'
      },
      firstName: {
        required: 'First Name is required',
        minlength: 'First Name must be at least three characters.',
        maxlength: 'First Name cannot exceed 10 characters.'
      },
      lastName: {
        required: 'Last Name is required',
        minlength: 'Last Name must be at least three characters.',
        maxlength: 'Last Name cannot exceed 10 characters.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit() {
    this.signUpFormStep2 = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    });
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.signUpFormStep2.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.signUpFormStep2);
    });
  }

  submitFormData() {
    const displayName = this.signUpFormStep2.get('displayName').value;
    const firstName = this.signUpFormStep2.get('firstName').value;
    const lastName = this.signUpFormStep2.get('lastName').value;
    this.authService.setPersonalData(displayName, firstName, lastName);
  }

}
