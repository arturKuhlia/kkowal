import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Material } from '../../../materials/models/material.model';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss']
})
export class MaterialsListComponent implements OnInit {
  @Input() materials: Material[];
  @Output() materialDeleted = new EventEmitter<Material>();
  @Output() materialEdited = new EventEmitter<Material>();

  constructor() { }

selectedItem:any;

  ngOnInit() {
  }

//    selected(id){
// //get material by id, return

//    }

  onEdit(material: Material) {
    this.materialEdited.emit(material);
  }

  onDelete(material: Material) {
    this.materialDeleted.emit(material);
  }

  trackByFn(index: any) {
    return index;
  }
}
