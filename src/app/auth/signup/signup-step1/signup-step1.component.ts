import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { EMAIL_REGEX } from '../../../validators/validator.config';

@Component({
  selector: 'app-signup-step1',
  templateUrl: './signup-step1.component.html',
  styleUrls: ['./signup-step1.component.css']
})
export class SignupStep1Component implements OnInit {

  pageTitle: string = 'Step 1';
  signUpFormStep1: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.signUpFormStep1 = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  submitFormData() {
    const email = this.signUpFormStep1.get('email').value;
    const password = this.signUpFormStep1.get('password').value;
    this.authService.setFirstStepData(email, password);
    this.router.navigate(['/signup/userData']);
  }
}
