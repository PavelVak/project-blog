import { Directive, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Directive({
  selector: '[appHide]'
})
export class HideDirective {
  @Input() hideTime = 3000;
  constructor(private authService: AuthService) {
    setTimeout(() => {
      this.authService.clearErrorMessage();
    }, this.hideTime);
  }
}
