import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'card-item-component',
  templateUrl: 'card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})

export class CardItemComponent {
  @Input() id: number;
  @Input() name: string;
  @Output() editEventAction = new EventEmitter();

  constructor() {}

  editAction() {
    this.editEventAction.emit({ id: this.id });
  }
}