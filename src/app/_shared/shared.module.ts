import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import {
  ButtonsModule,
  InputsModule,
  CardsModule,
  InputUtilitiesModule,
  IconsModule
} from 'angular-bootstrap-md';
import { CustomersModalComponent } from './components/customers-modal/customers-modal.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { SuitesListComponent } from './components/suites-list/suites-list.component';
import { SuitesModalComponent } from './components/suites-modal/suites-modal.component';
import { MaterialsModalComponent } from './components/materials-modal/materials-modal.component';
import { MaterialsListComponent } from './components/materials-list/materials-list.component';
import { SelectionsListComponent } from './components/selections-list /selections-list.component';
import { OptionsListComponent } from './components/options-list/options-list.component';
import { SelectionsModalComponent } from './components/selections-modal/selections-modal.component';
import { OptionsModalComponent } from './components/options-modal/options-modal.component';
import { FilterPipe } from './components/options-modal/filter.pipe'; 
import { StructureComponent } from '../structure/structure.component';
import { RowComponent } from '../structure/row/row.component';

@NgModule({
  declarations: [
        ConfirmModalComponent,
    CustomersModalComponent,
    ProjectModalComponent,
    ProjectsListComponent,
    ProjectComponent,
    StructureComponent,
    RowComponent,
    CustomersListComponent,
    SuitesListComponent,
    SuitesModalComponent,
    MaterialsListComponent,
    MaterialsModalComponent,
    SelectionsListComponent,
    SelectionsModalComponent,
    OptionsListComponent,
    OptionsModalComponent,
    FilterPipe,
   
  ],
  imports: [
    CommonModule,
    InputsModule,
    InputUtilitiesModule,
    IconsModule,
    FormsModule,
    ButtonsModule,
    CardsModule
  ],
  exports: [ProjectsListComponent, StructureComponent, RowComponent, 
    ProjectComponent, OptionsListComponent,  SelectionsListComponent, MaterialsListComponent, SuitesListComponent, CustomersListComponent],
  providers: [],
  entryComponents: [
    ConfirmModalComponent,
    SuitesModalComponent,
    CustomersModalComponent,
    MaterialsModalComponent,
    ProjectModalComponent,
    OptionsModalComponent,
    SelectionsModalComponent
  ]
})
export class SharedModule { }
