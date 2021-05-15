import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Selection } from '../../../selections/models/selection.model';

@Component({
  selector: 'app-selections-list',
  templateUrl: './selections-list.component.html',
  styleUrls: ['./selections-list.component.scss']
})
export class SelectionsListComponent implements OnInit {
  @Input() selections: Selection[];
  @Output() selectionDeleted = new EventEmitter<Selection>();
  @Output() selectionEdited = new EventEmitter<Selection>();

  constructor() { }

  ngOnInit() {
  }

  onEdit(selection: Selection) {
    this.selectionEdited.emit(selection);
  }

  onDelete(selection: Selection) {
    this.selectionDeleted.emit(selection);
  }

  trackByFn(index: any) {
    return index;
  }
}
