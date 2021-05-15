import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './containers/options.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule, TableModule, IconsModule, ModalModule } from 'angular-bootstrap-md';

import * as fromOptions from './store/options.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OptionsEffects } from './store/options.effects';
import { OptionsRoutingModule } from './options-routing.module';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OptionsRoutingModule,
    ModalModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    TableModule,
    StoreModule.forFeature('options', fromOptions.optionsReducer),
    EffectsModule.forFeature([OptionsEffects])
  ],
  declarations: [OptionsComponent],
  exports: [OptionsComponent],
})
export class OptionsModule { }
