import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';
import { UsersListComponent } from './users-list/users-list.component';


export const routesUser: Routes = [
  { path: 'userprofile', component: UserProfileComponent },
  { path: 'userEdit', component: UserEditComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'users-list', component: UsersListComponent, data: {onlyFollowers: false} },
  { path: 'friends-list', component: UsersListComponent, data: {onlyFollowers: true}},
];
