import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { LoadingHelper } from "src/app/shared/helpers/loading.helper";
import { PurchasesService } from "../../services/purchases.service";
import { ReceiptModalPage } from "../receipt-modal/receipt-modal.page";

@Component({
  selector: 'purchase-confirmation-page',
  templateUrl: 'purchase-confirmation.page.html',
  styleUrls: ['./purchase-confirmation.page.scss'],
})

export class PurchaseConfirmationPage implements OnInit {
  purchaseCode;
  purchaseData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalController: ModalController,
    private purchaseService: PurchasesService,
    private loadingHelper: LoadingHelper
  ) {}
  
  ngOnInit() {
    this.loadingHelper.present();
    this.purchaseCode = this.activatedRoute.snapshot.params.purchaseCode;
    this.loadPurchaseData();
  }

  loadPurchaseData() {
    this.purchaseService.getPurchaseByCode(this.purchaseCode).subscribe((result: any) => {
      this.purchaseData = result.data;
      this.loadingHelper.dismiss();
    },
    (error) => {
      this.loadingHelper.dismiss();
    });
  }

  goToMyTickets() {
    this.router.navigate(['/tabs/tickets']);
  }

  async openReceipt() {
    const modal = await this.modalController.create({
      component: ReceiptModalPage,
      componentProps: {
        receiptData: this.purchaseData
      },
      swipeToClose: true
    });

    await modal.present();
  }
}