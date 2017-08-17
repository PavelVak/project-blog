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
    this.followersService.addFollower(followerKey);
    if($event.target.innerText == 'Add to Friends') {
      $event.target.innerText = 'Remove from Friends';
      this.isFriend = true;
    } else {
      $event.target.innerText = 'Add to Friends';
      this.isFriend = false;
    }
  }

  test(){
    let keyArr: string[] = [];
    let usersArr: User[] = [];
    this.followersService.getAllFollowers().subscribe(data => {
      keyArr = data.map(item => item.$value);
      keyArr.forEach((key) => {
         this.userService.getUserByKey(key).subscribe(data => usersArr.push(...data));
      });
    });
    console.log('Мои друзья ', usersArr);
  }

}
