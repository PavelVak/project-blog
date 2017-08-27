import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { EMAIL_REGEX } from '../../validators/validator.config';
import { Observable } from 'rxjs/Observable';
import { CanComponentDeactivate } from '../../can-deactivate-guard.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  user: User;
  subscription: Subscription;

  pageTitle: string = 'Edit profile';
  editForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private router: Router,
              private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.getMessage().subscribe(user => { this.user = user});

    this.editForm = this.fb.group({
      displayName: [this.user.displayName, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: [this.user.email, [Validators.pattern(EMAIL_REGEX)]],
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      lastName: [this.user.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
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
    const $key = this.authservice.getUid();
    const user: User = new User(displayName, email, firstName, lastName);
    this.authservice.editCurrentUser(user);
    this.router.navigate(['/userprofile']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.user.displayName !== this.editForm.get('displayName').value ||
        this.user.email !== this.editForm.get('email').value ||
        this.user.firstName !== this.editForm.get('firstName').value ||
        this.user.lastName !== this.editForm.get('lastName').value) {
      return window.confirm('Do you really want leave?');
    }
    return true;
  }
}
