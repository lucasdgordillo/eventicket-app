import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'prices-modal',
  templateUrl: 'prices.modal.html',
  styleUrls: ['./prices.modal.scss'],
})

export class PricesModal implements OnInit {
  @Input() pricesData = [];
  prices = [];
  idItem = 1;

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {
    if (this.pricesData.length < 1) {
      this.prices.push({ id: Math.random(), name: '', price: 0 });
    } else {
      this.prices = this.pricesData;
    }
  }

  addNewPrice() {
    this.prices.push({ id: Math.random(), name: '', price: 0 });
  }

  updatePricesArray(value) {
    this.prices.find((item) => { if (item.id == value.id) { return item[value.field] = value.value } });
  }

  deletePriceItem(event) {
    this.prices = this.prices.filter( item => item.id !== event.id );
  }

  updatePrices() {
    this.dismiss({ values: this.prices });
  }

  dismiss(data = null) {
    this.modalController.dismiss(data);
  }
}