import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FollowersService } from '../followers.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  onlyFollowers: boolean;

  constructor(private userService: UserService,
              private followersService: FollowersService,
              private route: ActivatedRoute) {
    this.onlyFollowers = this.route.snapshot.data['onlyFollowers'];
  }

  ngOnInit() {
    console.log('only', this.onlyFollowers);
    if(!this.onlyFollowers) {
      let keyArr: string[] = [];
      this.followersService.getAllFollowers().subscribe(data => {
        keyArr = data.map(item => item.$value);
        this.userService.getAllUsers().subscribe(data => {
          this.users = data.filter((item) => {
            if (keyArr.indexOf(item.$key) > -1) {
              item.isFollower = true;
              return item;
            }
            return item.$key != localStorage.getItem('uid');
          });
          console.log(this.users);
          return this.users;
        });
      });
    } else {
      let keyArr: string[] = [];
      this.followersService.getAllFollowers().subscribe(data => {
        keyArr = data.map(item => item.$value);
        console.log(this.users);
        keyArr.forEach((key) => {
          this.userService.getUserByKey(key).subscribe(data => this.users.push(...data));
        });
      });
    }
  }
}
