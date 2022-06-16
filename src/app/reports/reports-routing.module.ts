import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportsPage } from "./pages/reports/reports.page";
import { RrppReportPage } from "./pages/rrpp-report/rrpp-report.page";
import { SalesByProvinceReport } from "./pages/sales-by-province/sales-by-province-report.page";
import { SalesReportPage } from "./pages/sales-report/sales-report.page";

const routes: Routes = [
  {
    path: '',
    component: ReportsPage
  },
  {
    path: 'rrpps-report',
    component: RrppReportPage
  },
  {
    path: 'ticket-sales-report',
    component: SalesReportPage
  },
  {
    path: 'ticket-sales-by-province-report',
    component: SalesByProvinceReport
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
}) 
export class ReportsRoutingModule {}