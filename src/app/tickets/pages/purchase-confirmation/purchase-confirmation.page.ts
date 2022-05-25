import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'purchase-confirmation-page',
  templateUrl: 'purchase-confirmation.page.html',
  styleUrls: ['./purchase-confirmation.page.scss'],
})

export class PurchaseConfirmationPage implements OnInit {
  purchaseCode;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.purchaseCode = this.activatedRoute.snapshot.params.purchaseCode;
  }

  goToMyTickets() {
    this.router.navigate(['/tabs/tickets']);
  }
}