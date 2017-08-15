import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.authservice.getMessage().subscribe(user => { this.user = user});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRedact() {
    this.router.navigate(['/useredit']);
  }

}
