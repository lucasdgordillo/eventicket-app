import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { CreditCardHelper } from 'src/app/shared/helpers/credit-card.helper';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { MessageHelper } from 'src/app/shared/helpers/message.helper';
import { PaymentModal } from 'src/app/shared/pages/payment-modal/payment.modal';
import { EventsService } from 'src/app/shared/services/events.service';
import { PurchasesService } from 'src/app/tickets/services/purchases.service';
import { Invoice, InvoiceDetail, PaymentInformation, PaymentType, Purchase } from '../../models/purchase.interface';

@Component({
  selector: 'even-checkout-page',
  templateUrl: 'event-checkout.page.html',
  styleUrls: ['./event-checkout.page.scss'],
})
export class EventCheckoutPage implements OnInit {
  eventId;
  eventData;
  purchaseObj: Purchase;
  availableRrpps = [];
  serviceChargePercentage = 15;
  showRrppSelector: boolean = false;
  selectedRrppId;
  paymentInfo: PaymentInformation = null;
  cartValues = [];
  showCartEmptyError: boolean = false;
  showPaymentInformationEmptyError: boolean = false;

  public rrppForm: FormGroup = new FormGroup({
    rrpp: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private modalController: ModalController,
    private creditCardHelper: CreditCardHelper,
    private purchasesService: PurchasesService,
    private loadingHelper: LoadingHelper,
    private router: Router,
    private messageHelper: MessageHelper
  ) {}
  
  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.params.eventId;
    this.loadEventInformation();
    this.paymentInfo = { 
      holder_full_name: 'Lucas Gordillo',
      billing_address: 'Obispo carranza 2082',
      card_number: '4444444444444444',
      expiration_date: '12/2023',
      payment_type: PaymentType.VISA_DEBIT,
      ccv: 333,
      dniNumber: '40247328'
    }
  }

  loadEventInformation() {
    this.eventsService.getEventById(this.eventId).subscribe((event) => {
      if (event.data) {
        this.eventData = event.data;
        this.eventsService.getAllRrppsByProductor(event.data.productor.id).subscribe((rrpps) => {
          this.availableRrpps = rrpps.data;
        });
      }
    });
  }

  ticketQuantityChange(item, event) {
    this.showCartEmptyError = false;
    if (typeof event.detail.value !== 'number' && event.detail.value < 0) { return; }
    const quantity = Number(event.detail.value);
    
    if (this.cartValues.length > 0) {
      // Verifico que si el valor existe
      const existValue = this.cartValues.find(element => { return element.id === item.id; });
      // Si existe, lo elimino y lo vuelvo a agregar con su nuevo quantity value
      if (existValue) {
        this.cartValues = this.cartValues.filter((cartValue) => cartValue.id !== item.id);
        this.cartValues.push({ ...existValue, quantity: quantity });
      } 
      // Si no existe, entonces agrego un nuevo value
      else {
        const newCartValue = { id: item.id, name: item.name, unit_price: item.price, quantity: quantity };
        this.cartValues.push(newCartValue);
      }
    } else {
      const newCartValue = { id: item.id, name: item.name, unit_price: item.price, quantity: quantity };
      this.cartValues.push(newCartValue);
    }
  }

  enableRrppSelector() {
    this.showRrppSelector = !this.showRrppSelector;

    if (!this.showRrppSelector) {
      this.selectedRrppId = null;
    }
  }

  onSelectRrpp(event) {
    this.selectedRrppId = event.detail.value;
  }

  async openPaymentMethodModal() {
    const modal = await this.modalController.create({
      component: PaymentModal,
      componentProps: {},
      swipeToClose: true
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      if (data.values) {
        this.showPaymentInformationEmptyError = false;
        this.paymentInfo = data.values;  
      }
    }
  }

  getPaymentMethodName(paymentMethodName: PaymentType) {
    switch (paymentMethodName) {
      case PaymentType.VISA_DEBIT:
        return 'VISA DEBITO';
      case PaymentType.VISA_CREDIT:
        return 'VISA CREDITO';
      case PaymentType.MASTERCARD_DEBIT:
        return 'MASTERCARD DEBITO';
      case PaymentType.MASTERCARD_CREDIT:
        return 'MASTERCARD CREDITO';
      default:
        return '';
    }
  }

  getCreditCardFormat(number: string) {
    return this.creditCardHelper.getCreditCardNumberFormat(number);
  }

  deleteMethodPayment() {
    this.paymentInfo = null;
  }

  get serviceChargeValue() {
    let value = 0;
    if (this.cartValues.length > 0) {
      value = (this.totalWithOutCommissions * this.serviceChargePercentage) / 100;  
    }
    return value;
  }

  get totalWithOutCommissions() {
    let value = 0;
    this.cartValues.forEach(cartValue => {
      value = value + (cartValue.unit_price * cartValue.quantity);
    });
    return value;
  }

  get totalWithCommissions() {
    let value = 0;
    if (this.cartValues.length > 0) {
      value = this.totalWithOutCommissions + this.serviceChargeValue;  
    }
    return value;
  }

  clearErrors() {
    this.showCartEmptyError = false;
    this.showPaymentInformationEmptyError = false;
  }

  async checkoutAction() {
    this.clearErrors();
    const invoiceDetails = this.prepareInvoiceDetails();

    if (invoiceDetails.length < 1) {
      this.showCartEmptyError = true;
      return;
    }

    if (!this.paymentInfo) {
      this.showPaymentInformationEmptyError = true;
      return;
    }

    this.loadingHelper.present();
    const invoiceData: Invoice = {
      payment_information: this.paymentInfo,
      total_with_fee: this.totalWithCommissions,
      total_without_fee: this.totalWithOutCommissions,
      payment_date: moment().format('YYYY-MM-DD'),
      invoice_details: invoiceDetails
    };
    const purchaseData: Purchase = {
      productor: this.eventData.productor.id,
      event: Number(this.eventId),
      rrpp: this.selectedRrppId,
      invoice: invoiceData
    };

    this.purchasesService.registerPurchase(purchaseData).subscribe((response) => {
      this.loadingHelper.dismiss();
    }, (error) => {
      this.loadingHelper.dismiss();
      this.messageHelper.showAlertError('Hubo un error. Intente nuevamente en unos minutos');
    });
  }

  prepareInvoiceDetails() {
    let invoiceDetails: InvoiceDetail[] = [];
    this.cartValues.forEach(item => {
      if (item.quantity > 0) {
        invoiceDetails.push({ name: item.name, unit_price: item.unit_price, quantity: item.quantity });
      }
    });
    return invoiceDetails;
  }
}