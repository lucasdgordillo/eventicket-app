import { AfterContentInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { DatetimeModal } from '../../pages/datetime-modal/datetime.modal';

@Component({
  selector: 'item-datetime-component',
  templateUrl: 'item-datetime.component.html',
  styleUrls: ['./item-datetime.component.scss']
})

export class ItemDatetimeComponent {
  @Input() label: string = '';
  @Input() dateValue: string = '';
  @Input() datePresentation: string = 'date';
  @Input() cssStyle: string = 'rounded-item';
  @Input() controlName: FormControl;
  @Output() selectDateTimeEvent = new EventEmitter();
  formatedDateValue: string = '';

  constructor(
    private modalController: ModalController
  ) {}

  async openDatetimeModal() {
    const modal = await this.modalController.create({
      component: DatetimeModal,
      componentProps: {
        defaultValue: this.dateValue,
        presentation: this.datePresentation
      },
      cssClass: 'custom-datetime-modal',
      swipeToClose: true
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      if (data.date) {
        this.emitSelectDateTimeEvent(data.date);
      }
    }
  }

  emitSelectDateTimeEvent(date) {
    this.formatedDateValue = this.getFormatedDateValue(date);
    this.dateValue = date;
    this.selectDateTimeEvent.emit({ value: this.formatedDateValue });
  }

  getFormatedDateValue(value) {
    if (this.datePresentation === 'time') {
      return moment(value).format('h:mm');
    } else if (this.datePresentation === 'date-time') {
      return moment(value).format('YYYY-MM-DD h:mm');
    } else if (this.datePresentation === 'year') {
      return moment(value).format('YYYY');
    } else {
      return moment(value).format('YYYY-MM-DD');
    }
  }
}