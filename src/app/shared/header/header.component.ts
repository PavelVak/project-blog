import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from "../models/user.model";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.authservice.getMessage().subscribe(user => {this.user = user; console.log('2', this.user)});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogOut() {
    this.authservice.logout();
    this.router.navigate(['/signin']);
  }
}
