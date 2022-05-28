import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScannedTicketsPage } from "./pages/scanned-tickets/scanned-tickets.page";

const routes: Routes = [
  {
    path: '',
    component: ScannedTicketsPage
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
}) 
export class ScannedTicketsRoutingModule {}