import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { UserEditComponent } from './user-edit/user-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserService } from './user.service';
import { FollowersService } from './followers.service';
import { routesUser } from './routes';

@NgModule({
  declarations: [
   UserEditComponent,
   UserProfileComponent,
   UsersListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesUser),
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    UserEditComponent,
    UserProfileComponent,
    UsersListComponent
  ],
  providers: [UserService, FollowersService],
})
export class UserModule {}
