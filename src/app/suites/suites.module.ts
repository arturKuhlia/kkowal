import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuitesComponent } from './containers/suites.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule, TableModule, IconsModule, ModalModule } from 'angular-bootstrap-md';

import * as fromSuites from './store/suites.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SuitesEffects } from './store/suites.effects';
import { SuitesRoutingModule } from './suites-routing.module';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SuitesRoutingModule,
    ModalModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    TableModule,
    StoreModule.forFeature('suites', fromSuites.suitesReducer),
    EffectsModule.forFeature([SuitesEffects])
  ],
  declarations: [SuitesComponent],
  exports: [SuitesComponent],
})
export class SuitesModule { }
