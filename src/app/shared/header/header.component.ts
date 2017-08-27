import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.subscription = this.userService.getMessage().subscribe(user => {this.user = user; console.log('2', this.user)});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
