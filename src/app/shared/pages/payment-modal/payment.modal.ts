import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'payment-modal',
  templateUrl: 'payment.modal.html',
  styleUrls: ['./payment.modal.scss'],
})

export class PaymentModal implements OnInit {
  @Input() paymentInformationData: any;

  public paymentMethodForm: FormGroup = new FormGroup({
    holder_full_name: new FormControl('', Validators.required),
    billing_address: new FormControl('', Validators.required),
    card_number: new FormControl('', Validators.required),
    expiration_date: new FormControl('', Validators.required),
    payment_type: new FormControl('', Validators.required),
    ccv: new FormControl('', Validators.required),
  dniNumber: new FormControl('', Validators.required)
  });

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {
  }

  dismiss(data = null) {
    this.modalController.dismiss(data);
  }

  submitForm() {
    if (!this.paymentMethodForm.valid) {
      this.touchForms();
    } else {
      this.dismiss({ values: this.paymentMethodForm.value });
    }
  }

  touchForms() {
    Object.keys(this.paymentMethodForm.controls).forEach((field) => {
      const control = this.paymentMethodForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  public invalid(control: FormControl) {
    return !control.valid && control.touched && control.dirty;
  }

  get holder_full_name(): FormControl {
    return this.paymentMethodForm.get('holder_full_name') as FormControl;
  }

  get billing_address(): FormControl {
    return this.paymentMethodForm.get('billing_address') as FormControl;
  }

  get card_number(): FormControl {
    return this.paymentMethodForm.get('card_number') as FormControl;
  }

  get expiration_date(): FormControl {
    return this.paymentMethodForm.get('expiration_date') as FormControl;
  }

  get payment_type(): FormControl {
    return this.paymentMethodForm.get('payment_type') as FormControl;
  }

  get ccv(): FormControl {
    return this.paymentMethodForm.get('ccv') as FormControl;
  }

  get dniNumber(): FormControl {
    return this.paymentMethodForm.get('dniNumber') as FormControl;
  }
}