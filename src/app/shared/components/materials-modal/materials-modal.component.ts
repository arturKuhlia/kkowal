import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Material } from '../../../materials/models/material.model';

import { Observable, Subject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms'; 
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AngularFireAuth } from '@angular/fire/auth';
import { getIsLoading } from 'src/app/auth/store/auth.selectors';
import { getMaterials } from 'src/app/materials/store/materials.selectors';

import * as fromMaterials from 'src/app/materials/store/materials.actions';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-materials-modal',
  templateUrl: './materials-modal.component.html',
  styleUrls: ['./materials-modal.component.scss']
})
export class MaterialsModalComponent implements OnInit {
  @ViewChild('materialForm', { static: true })
  materialForm: NgForm;
 
  heading: string;
  material: Material = {};

  materialData: Subject<Material> = new Subject();
 
   
 

  lastMaterialIndex: number;

  isLoading$: Observable<boolean>;
  materials: Material[] | null;
 

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
  onSave() { 
    if (this.materialForm.valid) {
      this.materialData.next(this.material);
    this.modalRef.hide();
    } else {
      const controls = this.materialForm.controls;
      Object.keys(controls).forEach( controlName => controls[controlName].markAsTouched());
    }
  }

}
