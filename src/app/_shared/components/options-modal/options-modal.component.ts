import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Option } from '../../../options/models/option.model';

import { Observable, Subject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Material } from 'src/app/materials/models/material.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AngularFireAuth } from '@angular/fire/auth';
import { getMaterials } from 'src/app/materials/store/materials.selectors';
import { map } from 'rxjs/operators';
import * as fromMaterials from 'src/app/materials/store/materials.actions';
import { getIsLoading } from 'src/app/_auth/store/auth.selectors';
 


@Component({
  selector: 'app-options-modal',
  templateUrl: './options-modal.component.html',
  styleUrls: ['./options-modal.component.scss']
})
export class OptionsModalComponent implements OnInit {
  @ViewChild('optionForm', { static: true }) optionForm: NgForm;
  filterarg:string =""
  heading: string;
  option: Option = {};

  optionData: Subject<Option> = new Subject();

  lastMaterialIndex: number;

  isLoading$: Observable<boolean>;
  materials: Material[] | null;
  optionTypes:any[]=["color","finish","material", "a", "b"];
  materialsSub: Subscription;

  constructor(public modalRef: MDBModalRef,  private store: Store<AppState>, private afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.isLoading$ = this.store.select(getIsLoading);

    this.materialsSub = this.store.select(getMaterials).pipe(
      map((materials: Material[]) => {
        if (this.user && !materials) {
          this.store.dispatch(new fromMaterials.MaterialsQuery());
        }
        return materials;
      })
    )
      .subscribe((materials: Material[]) => {
        if (materials && materials.length !== 0) {
          const index: number = Number(materials[materials.length - 1].id);
          this.lastMaterialIndex = index;
        } else {
          this.lastMaterialIndex = 0;
        }

        this.materials = materials;
      })
    }

  get user() {
    return this.afAuth.auth.currentUser;
  }

filter(item:any){
 this.filterarg= item
}
 
 
onSave() {
    if (this.optionForm.valid) {
      this.optionData.next(this.option);
      this.modalRef.hide();
    } else {
      const controls = this.optionForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }

}
