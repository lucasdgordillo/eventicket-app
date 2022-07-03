import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PurchaseStatus, ScannedPurchaseStatus } from "src/app/events/models/purchase.interface";
import { PurchasesService } from "src/app/tickets/services/purchases.service";

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
    private purchasesService: PurchasesService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.loadTickets();
  }

  doRefresh(event) {
    this.verifiedTickets = [];
    this.rejectedTickets = [];
    this.loadTickets();
    setTimeout(() => {
      event.target.complete();
    }, 1);
  }

  loadTickets() {
    this.purchasesService.getAllScannedPurchases().subscribe( (scannedPurchases) => {
      if (!scannedPurchases.data) {
        return;
      }
      const scannedPurchasesArray = scannedPurchases.data;
      scannedPurchasesArray.forEach(scannedPurchase => {
        if (scannedPurchase.status === ScannedPurchaseStatus.APPROVED) {
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

  scanTicket() {
    this.router.navigate(['/scanned-tickets/scan-ticket']);
  }
}