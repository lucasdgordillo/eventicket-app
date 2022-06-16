import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx';
import * as moment from "moment";

@Component({
  selector: 'receipt-modal',
  templateUrl: 'receipt-modal.page.html',
  styleUrls: ['./receipt-modal.page.scss'],
})

export class ReceiptModalPage implements OnInit {
  @Input() receiptData: any;
  content: string;

  constructor(
    private modalController: ModalController,
    private pdfGenerator: PDFGenerator
  ) {}
  
  ngOnInit() {
  }

  downloadPDF() {
    this.content = document.getElementById('receipt-pdf').innerHTML;
    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: 'Order-Invoice.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });
  }

  getFormatedDate(date, format) {
    return moment(date).format(format);
  }

  dismiss(data = null) {
    this.modalController.dismiss(data);
  }

  getServiceChargeValue(totalWithoutFee, totalWithFee) {
    return totalWithFee - totalWithoutFee;
  }
}