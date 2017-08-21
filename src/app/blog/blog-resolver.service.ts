import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Blog } from '../shared/models/blog.model';
import { BlogService } from './blog.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlogResolverService implements Resolve<Blog> {
  constructor (private blogService: BlogService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Blog> | Promise<Blog> | Blog {
    return this.blogService.getBlogBykey(route.params['key']);
  }
}
