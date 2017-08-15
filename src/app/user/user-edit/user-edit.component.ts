import { Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { GenericValidator } from "../../validators/generic-validator";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  user: User;
  subscription: Subscription;

  pageTitle: string = 'Edit profile';
  editForm: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      email: {
        pattern: 'Please enter a valid email address',
      },
      displayName: {
        minlength: 'DisplayName must be at least three characters.',
        maxlength: 'DisplayName cannot exceed 10 characters.'
      },
      firstName: {
        minlength: 'First Name must be at least three characters.',
        maxlength: 'First Name cannot exceed 10 characters.'
      },
      lastName: {
        minlength: 'Last Name must be at least three characters.',
        maxlength: 'Last Name cannot exceed 10 characters.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.subscription = this.authservice.getMessage().subscribe(user => { this.user = user});

    this.editForm = this.fb.group({
      displayName: [this.user.displayName, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: [this.user.email, [Validators.pattern(EMAIL_REGEX)]],
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      lastName: [this.user.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    });
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.editForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.editForm);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEdit() {
    const displayName = this.editForm.get('displayName').value;
    const email = this.editForm.get('email').value;
    const firstName = this.editForm.get('firstName').value;
    const lastName = this.editForm.get('lastName').value;
    const user: User = new User(displayName, email, firstName, lastName);
    this.authservice.editCurrentUser(user);
    this.router.navigate(['/userprofile']);
  }

}
