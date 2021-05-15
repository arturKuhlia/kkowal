import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionsComponent } from './containers/selections.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule, TableModule, IconsModule, ModalModule } from 'angular-bootstrap-md';

import * as fromSelections from './store/selections.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SelectionsEffects } from './store/selections.effects';
import { SelectionsRoutingModule } from './selections-routing.module';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SelectionsRoutingModule,
    ModalModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    TableModule,
    StoreModule.forFeature('selections', fromSelections.selectionsReducer),
    EffectsModule.forFeature([SelectionsEffects])
  ],
  declarations: [SelectionsComponent],
  exports: [SelectionsComponent],
})
export class SelectionsModule { }
