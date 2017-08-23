import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { GenericValidator } from '../../validators/generic-validator';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { validationMessages } from '../../validators/validation-messages';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.css']
})
export class InputWrapperComponent implements OnInit, AfterViewInit {
  @Input() label: string;
  @Input() element: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() group: FormGroup;
  @Input() control: FormControl;
  @Input() controlName: string;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor() {
    this.validationMessages = validationMessages;
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.group.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.group);
    });
  }
}
