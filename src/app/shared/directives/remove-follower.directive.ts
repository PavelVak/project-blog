import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRemoveFollower]'
})
export class RemoveFollowerDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('document: click', ['$event'])
  handleClick(event: Event) {
    // let target = <any>event.target;
    // if (this.element.nativeElement.contains(target).hasClass('remove-follower')) {
    //   console.log(event.target);
    // }
  }
}
