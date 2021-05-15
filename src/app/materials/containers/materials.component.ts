import { Component, OnInit, OnDestroy } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';

import * as fromMaterials from '../store/materials.actions';
import { Material } from '../models/material.model';
import { Subscription, Observable } from 'rxjs';
import { getMaterials, getIsLoading } from '../store/materials.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../_shared/components/confirm-modal/confirm-modal.component';
import { MaterialsModalComponent } from '../../_shared/components/materials-modal/materials-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  materials: Material[] | null;
  modalRef: MDBModalRef;

  materialsSub: Subscription;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  lastMaterialIndex: number;

  constructor(private modalService: MDBModalService, private store: Store<AppState>, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);

    this.materialsSub = this.store.select(getMaterials).pipe(
      map( (materials: Material[]) => {
        if (this.user && !materials) {
          this.store.dispatch(new fromMaterials.MaterialsQuery());
        }
        return materials;
      })
    )
    .subscribe( (materials: Material[]) => {
      if (materials && materials.length !== 0) {
        const index: number = Number(materials[materials.length - 1].id);
        this.lastMaterialIndex = index;
      } else {
        this.lastMaterialIndex = 0;
      }

      this.materials = materials;
    });
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  ngOnDestroy() {
    if (this.materialsSub) {
      this.materialsSub.unsubscribe();
    }
  }

  onAddMaterial() {
    this.modalRef = this.modalService.show(MaterialsModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new purchaser';
    this.modalRef.content.material.id = this.lastMaterialIndex + 1;

    this.modalRef.content.materialData.pipe(take(1)).subscribe( (materialData: Material) => {
      this.store.dispatch(new fromMaterials.MaterialsAdded({ material: materialData }));
    });
  }

  openEditMaterialModal(material: Material) {
    this.modalRef = this.modalService.show(MaterialsModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit Material';
    const materialCopy = {
      key: material.key,
      id: material.id || null,
      name: material.name || null,
      type: material.type || null,
      size: material.size || null,
      area: material.area || null,
      clients: material.clients || null,
      active: material.active || null,
      note: material.note || null,
       categories:material.categories || null,
  
     };
    this.modalRef.content.material = materialCopy;

    this.modalRef.content.materialData.pipe(take(1)).subscribe( (materialData: Material) => {
      this.store.dispatch(new fromMaterials.MaterialsEdited({ material: materialData }));
    });
  }

  openConfirmModal(material: Material) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromMaterials.MaterialsDeleted({ material }));
      }
    });
  }

  onMaterialEdit(material: Material) {
    this.openEditMaterialModal(material);
  }

  onMaterialDelete(material: Material) {
    this.openConfirmModal(material);
  }

}
