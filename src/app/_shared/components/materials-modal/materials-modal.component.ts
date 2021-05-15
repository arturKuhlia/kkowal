import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Material } from '../../../materials/models/material.model';

import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-materials-modal',
  templateUrl: './materials-modal.component.html',
  styleUrls: ['./materials-modal.component.scss']
})
export class MaterialsModalComponent implements OnInit {
  @ViewChild('materialForm', { static: true }) materialForm: NgForm;

  heading: string;
  material: Material = {};

  materialData: Subject<Material> = new Subject();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
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
