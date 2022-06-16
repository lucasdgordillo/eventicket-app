import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../shared/shared.module";
import { ReportFilterComponent } from "./components/report-filter/report-filter.component";
import { ReportsPage } from "./pages/reports/reports.page";
import { RrppReportPage } from "./pages/rrpp-report/rrpp-report.page";
import { SalesByProvinceReport } from "./pages/sales-by-province/sales-by-province-report.page";
import { SalesReportPage } from "./pages/sales-report/sales-report.page";
import { ReportsRoutingModule } from "./reports-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ReportsRoutingModule
  ],
  declarations: [ ReportsPage, RrppReportPage, ReportFilterComponent, SalesReportPage, SalesByProvinceReport ],
  providers: []
})
export class ReportsModule {}