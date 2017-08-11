import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userName: string;
  public isLogin: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.userName = localStorage.getItem('displayname').replace(/['"]+/g, '');
    console.log(this.userName);
  }

  onSignOut() {
    this.authService.logout();
  }

}
