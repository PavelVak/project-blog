import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from './blog.service';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogItemDetailComponent } from './blog-item-detail/blog-item-detail.component';
import { BlogAddEditComponent } from './blog-add-edit/blog-add-edit.component';
import { BlogAddEditFormComponent } from './blog-add-edit/blog-add-edit-form/blog-add-edit-form.component';
import { routesBlog } from './routes';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogItemComponent,
    BlogItemDetailComponent,
    BlogAddEditComponent,
    BlogAddEditFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesBlog),
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    BlogListComponent,
    BlogItemComponent,
    BlogItemDetailComponent,
    BlogAddEditComponent,
    BlogAddEditFormComponent
  ],
  providers: [BlogService],
})
export class BlogModule {}
