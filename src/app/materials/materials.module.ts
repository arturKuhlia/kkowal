import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsComponent } from './containers/materials.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule, TableModule, IconsModule, ModalModule } from 'angular-bootstrap-md';

import * as fromMaterials from './store/materials.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialsEffects } from './store/materials.effects';
import { MaterialsRoutingModule } from './materials-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialsRoutingModule,
    ModalModule,
    FormsModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    TableModule,
    StoreModule.forFeature('materials', fromMaterials.materialsReducer),
    EffectsModule.forFeature([MaterialsEffects])
  ],
  declarations: [MaterialsComponent],
  exports: [MaterialsComponent],
})
export class MaterialsModule { }
