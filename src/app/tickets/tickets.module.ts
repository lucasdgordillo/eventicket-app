import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TicketsRoutingModule } from './tickets-routing.module';
import { PurchaseConfirmationPage } from './pages/purchase-confirmation/purchase-confirmation.page';
import { NgxQRCodeModule } from "ngx-qrcode2";
import { PurchasesPage } from './pages/purchases/purchases.page';

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
    PurchasesPage
  ],
  providers: []
})
export class TicketsModule {}
