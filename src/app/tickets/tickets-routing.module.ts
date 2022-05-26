import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseConfirmationPage } from './pages/purchase-confirmation/purchase-confirmation.page';
import { PurchasesPage } from './pages/purchases/purchases.page';
import { ScanTicketPage } from './pages/scan-ticket/scan-ticket.page';
import { ScannedTicketsPage } from './pages/scanned-tickets.page/scanned-tickets.page';

const routes: Routes = [
  {
    path: '',
    component: PurchasesPage
  },
  {
    path: 'purchase-confirmation/:purchaseCode',
    component: PurchaseConfirmationPage
  },
  {
    path: 'scanned-tickets',
    component: ScannedTicketsPage
  },
  {
    path: 'scan-ticket',
    component: ScanTicketPage
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}
