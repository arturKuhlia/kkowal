import { Component, OnInit, OnDestroy } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';

import * as fromSelections from '../store/selections.actions';
import { Selection } from '../models/selection.model';
import { Subscription, Observable } from 'rxjs';
import { getSelections, getIsLoading } from '../store/selections.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../_shared/components/confirm-modal/confirm-modal.component';
import { SelectionsModalComponent } from '../../_shared/components/selections-modal/selections-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.scss']
})
export class SelectionsComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  selections: Selection[] | null;
  modalRef: MDBModalRef;

  selectionsSub: Subscription;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  lastSelectionIndex: number;

  constructor(private modalService: MDBModalService, private store: Store<AppState>, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);

    this.selectionsSub = this.store.select(getSelections).pipe(
      map( (selections: Selection[]) => {
        if (this.user && !selections) {
          this.store.dispatch(new fromSelections.SelectionsQuery());
        }
        return selections;
      })
    )
    .subscribe( (selections: Selection[]) => {
      if (selections && selections.length !== 0) {
        const index: number = Number(selections[selections.length - 1].id);
        this.lastSelectionIndex = index;
      } else {
        this.lastSelectionIndex = 0;
      }

      this.selections = selections;
    });
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  ngOnDestroy() {
    if (this.selectionsSub) {
      this.selectionsSub.unsubscribe();
    }
  }

  onAddSelection() {
    this.modalRef = this.modalService.show(SelectionsModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new purchaser';
    this.modalRef.content.selection.id = this.lastSelectionIndex + 1;

    this.modalRef.content.selectionData.pipe(take(1)).subscribe( (selectionData: Selection) => {
      this.store.dispatch(new fromSelections.SelectionsAdded({ selection: selectionData }));
    });
  }

  openEditSelectionModal(selection: Selection) {
    this.modalRef = this.modalService.show(SelectionsModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit Selection';
    const selectionCopy = {
      key: selection.key,
      id: selection.id || null,
      name: selection.name || null,
      type: selection.type || null,
      size: selection.size || null,
      area: selection.area || null,
      clients: selection.clients || null,
      active: selection.active || null,
      note: selection.note || null,
       categories:selection.categories || null,
  
     };
    this.modalRef.content.selection = selectionCopy;

    this.modalRef.content.selectionData.pipe(take(1)).subscribe( (selectionData: Selection) => {
      this.store.dispatch(new fromSelections.SelectionsEdited({ selection: selectionData }));
    });
  }

  openConfirmModal(selection: Selection) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromSelections.SelectionsDeleted({ selection }));
      }
    });
  }

  onSelectionEdit(selection: Selection) {
    this.openEditSelectionModal(selection);
  }

  onSelectionDelete(selection: Selection) {
    this.openConfirmModal(selection);
  }

}
