import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCommonModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

import {
  MaterialModule, MdAutocompleteModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule,
  MdChipsModule, MdCoreModule, MdDatepickerModule, MdDialogModule, MdExpansionModule, MdGridListModule,
  MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdNativeDateModule, MdPaginatorModule, MdProgressBarModule,
  MdProgressSpinnerModule, MdRadioModule, MdRippleModule, MdSelectModule,
  MdSidenavModule, MdSliderModule, MdSlideToggleModule, MdSnackBarModule, MdSortModule, MdTableModule, MdTabsModule,
  MdToolbarModule, MdTooltipModule
} from '@angular/material';
import { InputWrapperComponent } from './input-wrapper/input-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    InputWrapperComponent
  ],
  imports: [
    CommonModule,
    MdCommonModule,
    RouterModule,
    ReactiveFormsModule,
    /*Material section*/
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  ],
  exports: [
    HeaderComponent,
    InputWrapperComponent,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  ],
  providers: [],
})
export class SharedModule { }
