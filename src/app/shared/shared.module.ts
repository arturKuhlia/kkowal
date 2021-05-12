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

@NgModule({
  declarations: [
    ConfirmModalComponent,
    CustomersModalComponent,
    ProjectModalComponent,
    ProjectsListComponent,
    ProjectComponent,
    CustomersListComponent,
    SuitesListComponent,
    SuitesModalComponent,
    MaterialsListComponent,
    MaterialsModalComponent
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
  exports: [ProjectsListComponent, ProjectComponent, MaterialsListComponent, SuitesListComponent, CustomersListComponent],
  providers: [],
  entryComponents: [
    ConfirmModalComponent,
    SuitesModalComponent,
    CustomersModalComponent,
    MaterialsModalComponent,
    ProjectModalComponent
  ]
})
export class SharedModule {}
