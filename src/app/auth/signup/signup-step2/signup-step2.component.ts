import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.component.html',
  styleUrls: ['./signup-step2.component.css']
})
export class SignupStep2Component implements OnInit {
  pageTitle: string = 'Step 2';
  signUpFormStep2: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.signUpFormStep2 = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      avatar: [null]
    });
  }
  submitFormData() {
    const displayName = this.signUpFormStep2.get('displayName').value;
    const firstName = this.signUpFormStep2.get('firstName').value;
    const lastName = this.signUpFormStep2.get('lastName').value;
    this.authService.setPersonalData(displayName, firstName, lastName);
  }
}
