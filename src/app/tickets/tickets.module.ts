import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TicketsRoutingModule } from './tickets-routing.module';
import { PurchaseConfirmationPage } from './pages/purchase-confirmation/purchase-confirmation.page';
import { NgxQRCodeModule } from "ngx-qrcode2";
import { PurchasesPage } from './pages/purchases/purchases.page';
import { ScannedTicketsPage } from './pages/scanned-tickets.page/scanned-tickets.page';
import { ScanTicketPage } from './pages/scan-ticket/scan-ticket.page';

@NgModule({
  imports: [
    NgxQRCodeModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TicketsRoutingModule
  ],
  declarations: [ 
    PurchaseConfirmationPage,
    PurchasesPage,
    ScannedTicketsPage,
    ScanTicketPage
  ],
  providers: []
})
export class TicketsModule {}
