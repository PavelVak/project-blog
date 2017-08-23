import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EMAIL_REGEX } from '../../validators/validator.config';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  pageTitle: string = 'SignIn';
  signInForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    });
  }

  onSignin() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authService.signinUser(email, password);
  }

  onSigninGmail() {
    this.authService.signinGmail();
    this.router.navigate(['/']);
  }

}
