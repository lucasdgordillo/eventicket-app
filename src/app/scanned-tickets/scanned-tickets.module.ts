import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../shared/shared.module";
import { ScanTicketPage } from "./pages/scan-ticket/scan-ticket.page";
import { ScannedTicketsPage } from "./pages/scanned-tickets/scanned-tickets.page";
import { ScannedTicketsRoutingModule } from "./scanned-tickets-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ScannedTicketsRoutingModule
  ],
  declarations: [ ScannedTicketsPage, ScanTicketPage ],
  providers: []
})
export class ReportsModule {}