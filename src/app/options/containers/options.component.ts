import { Component, OnInit, OnDestroy } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';

import * as fromOptions from '../store/options.actions';
import { Option } from '../models/option.model';
import { Subscription, Observable } from 'rxjs';
import { getOptions, getIsLoading } from '../store/options.selectors';
import { take, map } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../_shared/components/confirm-modal/confirm-modal.component';
import { OptionsModalComponent } from '../../_shared/components/options-modal/options-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  options: Option[] | null;
  modalRef: MDBModalRef;

  optionsSub: Subscription;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  lastOptionIndex: number;

  constructor(private modalService: MDBModalService, private store: Store<AppState>, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);

    this.optionsSub = this.store.select(getOptions).pipe(
      map( (options: Option[]) => {
        if (this.user && !options) {
          this.store.dispatch(new fromOptions.OptionsQuery());
        }
        return options;
      })
    )
    .subscribe( (options: Option[]) => {
      if (options && options.length !== 0) {
        const index: number = Number(options[options.length - 1].id);
        this.lastOptionIndex = index;
      } else {
        this.lastOptionIndex = 0;
      }

      this.options = options;
    });
  }

  get user() {
    return this.afAuth.auth.currentUser;
  }

  ngOnDestroy() {
    if (this.optionsSub) {
      this.optionsSub.unsubscribe();
    }
  }

  onAddOption() {
    this.modalRef = this.modalService.show(OptionsModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new purchaser';
    this.modalRef.content.option.id = this.lastOptionIndex + 1;

    this.modalRef.content.optionData.pipe(take(1)).subscribe( (optionData: Option) => {
      this.store.dispatch(new fromOptions.OptionsAdded({ option: optionData }));
    });
  }

  openEditOptionModal(option: Option) {
    this.modalRef = this.modalService.show(OptionsModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit Option';
    const optionCopy = {
      key: option.key,
      id: option.id || null,
      active: option.active || null,
      choice: option.choice || null,
      options:option.options || null
  
     };
    this.modalRef.content.option = optionCopy;

    this.modalRef.content.optionData.pipe(take(1)).subscribe( (optionData: Option) => {
      this.store.dispatch(new fromOptions.OptionsEdited({ option: optionData }));
    });
  }

  openConfirmModal(option: Option) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromOptions.OptionsDeleted({ option }));
      }
    });
  }

  onOptionEdit(option: Option) {
    this.openEditOptionModal(option);
  }

  onOptionDelete(option: Option) {
    this.openConfirmModal(option);
  }

}
