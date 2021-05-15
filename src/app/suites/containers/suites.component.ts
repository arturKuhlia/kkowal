import { Component, OnInit, OnDestroy } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';

import * as fromSuites from '../store/suites.actions';
import { Suite } from '../models/suite.model';
import { Subscription, Observable } from 'rxjs';
import { getSuites, getIsLoading } from '../store/suites.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../_shared/components/confirm-modal/confirm-modal.component';
import { SuitesModalComponent } from '../../_shared/components/suites-modal/suites-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-suites',
  templateUrl: './suites.component.html',
  styleUrls: ['./suites.component.scss']
})
export class SuitesComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  suites: Suite[] | null;
  modalRef: MDBModalRef;

  suitesSub: Subscription;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  lastSuiteIndex: number;

  constructor(private modalService: MDBModalService, private store: Store<AppState>, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);

    this.suitesSub = this.store.select(getSuites).pipe(
      map( (suites: Suite[]) => {
        if (this.user && !suites) {
          this.store.dispatch(new fromSuites.SuitesQuery());
        }
        return suites;
      })
    )
    .subscribe( (suites: Suite[]) => {
      if (suites && suites.length !== 0) {
        const index: number = Number(suites[suites.length - 1].id);
        this.lastSuiteIndex = index;
      } else {
        this.lastSuiteIndex = 0;
      }

      this.suites = suites;
    });
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  ngOnDestroy() {
    if (this.suitesSub) {
      this.suitesSub.unsubscribe();
    }
  }

  onAddSuite() {
    this.modalRef = this.modalService.show(SuitesModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new purchaser';
    this.modalRef.content.suite.id = this.lastSuiteIndex + 1;

    this.modalRef.content.suiteData.pipe(take(1)).subscribe( (suiteData: Suite) => {
      this.store.dispatch(new fromSuites.SuitesAdded({ suite: suiteData }));
    });
  }

  openEditSuiteModal(suite: Suite) {
    this.modalRef = this.modalService.show(SuitesModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit Suite';
    const suiteCopy = {
      key: suite.key,
      id: suite.id || null,
      name: suite.name || null,
      type: suite.type || null,
      size: suite.size || null,
      area: suite.area || null,
      clients: suite.clients || null,
      active: suite.active || null,
      note: suite.note || null,
       categories:suite.categories || null,
  
     };
    this.modalRef.content.suite = suiteCopy;

    this.modalRef.content.suiteData.pipe(take(1)).subscribe( (suiteData: Suite) => {
      this.store.dispatch(new fromSuites.SuitesEdited({ suite: suiteData }));
    });
  }

  openConfirmModal(suite: Suite) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromSuites.SuitesDeleted({ suite }));
      }
    });
  }

  onSuiteEdit(suite: Suite) {
    this.openEditSuiteModal(suite);
  }

  onSuiteDelete(suite: Suite) {
    this.openConfirmModal(suite);
  }

}
