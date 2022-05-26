import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import * as moment from "moment";
import { LoadingHelper } from "src/app/shared/helpers/loading.helper";
import { MessageHelper } from "src/app/shared/helpers/message.helper";
import { PurchasesService } from "../../services/purchases.service";

@Component({
  selector: 'scan-ticket-page',
  templateUrl: 'scan-ticket.page.html',
  styleUrls: ['./scan-ticket.page.scss'],
})

export class ScanTicketPage implements OnInit {
  constructor(
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private loadingHelper: LoadingHelper,
    private purchasesService: PurchasesService,
    private messageHelper: MessageHelper
  ) {}
  
  ngOnInit() {
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      const code = barcodeData.text;
      this.verifyCode(code);
    }).catch(error => {
      console.log(error);
    })
  }

  verifyCode(purchaseCode) {
    this.loadingHelper.present();
    const todayDate = moment().format('YYYY-MM-DD');
    this.purchasesService.verifyPurchaseCode(purchaseCode, todayDate).subscribe((response) => {
      this.loadingHelper.dismiss();
      this.messageHelper.presentToast('Ticket validado con exito!', 2500);
      this.goToMyVerifyTickets();
    }, (error) => {
      this.loadingHelper.dismiss();
      if (error.error.message === 'PURCHASE_CODE_INVALID') {
        this.messageHelper.showAlertError('El codigo es invalido', false);
      }
    });
  }

  goToMyVerifyTickets() {
    this.router.navigate(['/tabs/tickets/scanned-tickets']);
  }
}