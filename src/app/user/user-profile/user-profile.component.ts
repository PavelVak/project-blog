import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FollowersService } from '../followers.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @Input() user: User;
  subscription: Subscription;
  isEdit: boolean = false;
  isFriend: boolean = false;

  constructor(private authservice: AuthService, private followersService: FollowersService, private router: Router,
              private userService: UserService) {}

  ngOnInit() {
    if(this.user == null) {
      this.subscription = this.authservice.getMessage().subscribe(user => this.user = user);
      this.isEdit = true;
    }
  }

  ngOnDestroy() {
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

  onRedact() {
    this.router.navigate(['/userEdit']);
  }

  onAddFollower($event){
    let followerKey = this.user.$key;
    if(!this.user.isFollower) {
      this.followersService.addFollower(followerKey);
      this.user.isFollower = true;
    } else {
      this.user.isFollower = false;
    }
  }



}
