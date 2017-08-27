import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogItemDetailComponent } from './blog-item-detail/blog-item-detail.component';
import { BlogAddEditComponent } from './blog-add-edit/blog-add-edit.component';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';

export const routesBlog: Routes = [
  { path: 'blogList', component: BlogListComponent},
  { path: 'friends-blog-list', component: BlogListComponent, data: {onlyFollowers: true}},
  { path: 'friends-blog-list/:key/:blogItemKey', component: BlogItemDetailComponent},
  { path: 'blogList/friend/:key', component: BlogListComponent},
  { path: 'blogList/:key', component: BlogItemDetailComponent},
  { path: 'blogList/friend/:key/:blogItemKey', component: BlogItemDetailComponent},
  { path: 'blog-edit/:key', component: BlogAddEditComponent,  data: {isEdit: true}, canDeactivate: [CanDeactivateGuard]},
  { path: 'blog-add', component: BlogAddEditComponent, data: {isEdit: false}, canDeactivate: [CanDeactivateGuard]},
];
