import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  pageTitle: string = 'Users List';
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.filter((item) => {
        return item.$key != localStorage.getItem('uid')
      });
      console.log(this.users);
      return this.users;
    });
  }

}
