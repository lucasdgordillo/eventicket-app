import { Component, OnInit } from "@angular/core";
import { PurchaseStatus } from "src/app/events/models/purchase.interface";
import { PurchasesService } from "../../services/purchases.service";

@Component({
  selector: 'scanned-tickets-page',
  templateUrl: 'scanned-tickets.page.html',
  styleUrls: ['./scanned-tickets.page.scss'],
})

export class ScannedTicketsPage implements OnInit {
  currentSegment = 'verified';
  verifiedTickets = [];
  rejectedTickets = [];

  constructor(
    private purchasesService: PurchasesService
  ) {}
  
  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.purchasesService.getAllScannedPurchases().subscribe( (scannedPurchases) => {
      const scannedPurchasesArray = scannedPurchases.data;
      scannedPurchasesArray.forEach(scannedPurchase => {
        if (scannedPurchase.purchase.status === PurchaseStatus.VERIFIED) {
          this.verifiedTickets.push(scannedPurchase);
        } else {
          this.rejectedTickets.push(scannedPurchase);
        }
      });
    });
  }

  segmentChanged(event) {
    if (event.detail.value === 'verified') {
      this.currentSegment = 'verified';
    } else {
      this.currentSegment = 'rejected';
    }
  }
}