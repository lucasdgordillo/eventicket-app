import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PurchaseStatus } from "src/app/events/models/purchase.interface";
import { LoadingHelper } from "src/app/shared/helpers/loading.helper";
import { PurchasesService } from "../../services/purchases.service";

@Component({
  selector: 'purchases-page',
  templateUrl: 'purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})

export class PurchasesPage implements OnInit {
  currentSegment = 'active';
  activePurchases = [];
  inactivePurchases = [];

  constructor(
    private router: Router,
    private purchasesService: PurchasesService,
    private loadingHelper: LoadingHelper
  ) {}
  
  ngOnInit() {
    this.loadingHelper.present();
    this.loadPurchases();
  }

  doRefresh(event) {
    this.activePurchases = [];
    this.inactivePurchases = [];
    this.loadPurchases();
    setTimeout(() => {
      event.target.complete();
    }, 1);
  }

  loadPurchases() {
    this.purchasesService.getAllPurchases().subscribe( (purchases) => {
      const purchasesArray = purchases.data;
      purchasesArray.forEach(purchase => {
        if (purchase.status === PurchaseStatus.NOT_VERIFIED) {
          this.activePurchases.push(purchase);
        } else {
          this.inactivePurchases.push(purchase);
        }
        this.loadingHelper.dismiss();
      });
    }, (error) => {
      this.loadingHelper.dismiss();
    });
  }

  openPurchaseConfirmation(purchase) {
    this.router.navigate([`/tickets/purchase-confirmation/${purchase.id}`]);
  }

  segmentChanged(event) {
    if (event.detail.value === 'active') {
      this.currentSegment = 'active';
    } else {
      this.currentSegment = 'inactive';
    }
  }
}