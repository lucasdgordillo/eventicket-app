import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'datetime-modal',
  templateUrl: 'datetime.modal.html',
  styleUrls: ['./datetime.modal.scss'],
})

export class DatetimeModal implements OnInit {
  @Input() defaultValue: string = '';
  @Input() presentation: string = 'date';
  selectedDateValue = '';
  date: string;

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.date = this.defaultValue ? this.defaultValue : String(moment().format());
  }

  dismiss(data = null) {
    this.modalController.dismiss(data);
  }

  confirmDate() {
    this.dismiss({ date: this.selectedDateValue });
  }

  onChangeDate(event) {
    this.selectedDateValue = event.detail.value;
  }
}