import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScanTicketPage } from "./pages/scan-ticket/scan-ticket.page";
import { ScannedTicketsPage } from "./pages/scanned-tickets/scanned-tickets.page";

const routes: Routes = [
  {
    path: '',
    component: ScannedTicketsPage
  },
  {
    path: 'scan-ticket',
    component: ScanTicketPage
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
}) 
export class ScannedTicketsRoutingModule {}