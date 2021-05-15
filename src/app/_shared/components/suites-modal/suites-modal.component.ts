import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Suite } from '../../../suites/models/suite.model';

import { Observable, Subject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Customer } from 'src/app/customers/models/customer.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AngularFireAuth } from '@angular/fire/auth';
import { getCustomers } from 'src/app/customers/store/customers.selectors';
import { map } from 'rxjs/operators';
import * as fromCustomers from 'src/app/customers/store/customers.actions';
import { getIsLoading } from 'src/app/_auth/store/auth.selectors';
 


@Component({
  selector: 'app-suites-modal',
  templateUrl: './suites-modal.component.html',
  styleUrls: ['./suites-modal.component.scss']
})
export class SuitesModalComponent implements OnInit {
  @ViewChild('suiteForm', { static: true }) suiteForm: NgForm;

  heading: string;
  suite: Suite = {};

  suiteData: Subject<Suite> = new Subject();

  lastCustomerIndex: number;

  isLoading$: Observable<boolean>;
  customers: Customer[] | null;
  array:any[]=[];

  customersSub: Subscription;


  constructor(public modalRef: MDBModalRef,  private store: Store<AppState>, private afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.isLoading$ = this.store.select(getIsLoading);

    this.customersSub = this.store.select(getCustomers).pipe(
      map((customers: Customer[]) => {
        if (this.user && !customers) {
          this.store.dispatch(new fromCustomers.CustomersQuery());
        }
        return customers;
      })
    )
      .subscribe((customers: Customer[]) => {
        if (customers && customers.length !== 0) {
          const index: number = Number(customers[customers.length - 1].id);
          this.lastCustomerIndex = index;
        } else {
          this.lastCustomerIndex = 0;
        }

        this.customers = customers;
      })
    }

  get user() {
    return this.afAuth.auth.currentUser;
  }

//   AddtoArray(feature:any){
//     this.array.push(feature);
// }
  onSave() {
    if (this.suiteForm.valid) {
      this.suiteData.next(this.suite);
      this.modalRef.hide();
    } else {
      const controls = this.suiteForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }

}
