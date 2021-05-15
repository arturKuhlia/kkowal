import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from '../../../options/models/option.model';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.scss']
})
export class OptionsListComponent implements OnInit {
  @Input() options: Option[];
  @Output() optionDeleted = new EventEmitter<Option>();
  @Output() optionEdited = new EventEmitter<Option>();

  constructor() { }

  ngOnInit() {
  }

  onEdit(option: Option) {
    this.optionEdited.emit(option);
  }

  onDelete(option: Option) {
    this.optionDeleted.emit(option);
  }

  trackByFn(index: any) {
    return index;
  }
}
