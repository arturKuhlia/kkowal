import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Suite } from '../../../suites/models/suite.model';

@Component({
  selector: 'app-suites-list',
  templateUrl: './suites-list.component.html',
  styleUrls: ['./suites-list.component.scss']
})
export class SuitesListComponent implements OnInit {
  @Input() suites: Suite[];
  @Output() suiteDeleted = new EventEmitter<Suite>();
  @Output() suiteEdited = new EventEmitter<Suite>();

  constructor() { }

  ngOnInit() {
  }

  onEdit(suite: Suite) {
    this.suiteEdited.emit(suite);
  }

  onDelete(suite: Suite) {
    this.suiteDeleted.emit(suite);
  }

  trackByFn(index: any) {
    return index;
  }
}
