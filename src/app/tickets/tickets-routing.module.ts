import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseConfirmationPage } from './pages/purchase-confirmation/purchase-confirmation.page';
import { PurchasesPage } from './pages/purchases/purchases.page';

const routes: Routes = [
  {
    path: '',
    component: PurchasesPage
  },
  {
    path: 'purchase-confirmation/:purchaseCode',
    component: PurchaseConfirmationPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}
