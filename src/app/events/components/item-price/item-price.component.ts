import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'item-price-component',
  templateUrl: 'item-price.component.html',
  styleUrls: ['./item-price.component.scss'],
})

export class ItemPriceComponent {
  @Input() id: number;
  @Input() name: string = '';
  @Input() price: number = 0;
  @Output() itemUpdateEvent = new EventEmitter();
  @Output() itemDeleteEvent = new EventEmitter();

  constructor() {}

  changePriceValue(event) {
    this.updateItemAction(Number(event.detail.value), 'price');
  }

  changeNameValue(event) {
    this.updateItemAction(event.detail.value, 'name');
  }

  updateItemAction(value, field) {
    this.itemUpdateEvent.emit({ id: this.id, value: value, field: field });
  }

  deleteItemAction() {
    this.itemDeleteEvent.emit({ id: this.id });
  }
}