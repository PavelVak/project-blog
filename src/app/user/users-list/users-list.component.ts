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
    if (!this.onlyFollowers) {
      let keyArr: string[] = [];
      this.followersService.getAllFollowers().subscribe(data => {
        keyArr = data.map(item => item.$value);
        this.userService.getAllUsers().subscribe(data => {
          this.users = data.filter((item) => {
            if (keyArr.indexOf(item.$key) > -1) {
              item.isFollower = true;
              return item;
            }
            return item.$key !== localStorage.getItem('uid');
          });
        });
      });
    } else {
      let keyArr: string[] = [];
      this.followersService.getAllFollowers().subscribe(data => {
        keyArr = data.map(item => item.$value);
        this.users = [];
        if (keyArr.length > 0) {
          keyArr.forEach((key) => {
            const sub = this.userService.getUserByKey(key).subscribe(data => {
              data[0].isFollower = true;
              this.users.push(...data);
              sub.unsubscribe();
            });
          });
        }
      });
    }
  }
}
