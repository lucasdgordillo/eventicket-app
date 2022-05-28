import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../shared/shared.module";
import { ReportsPage } from "./pages/reports/reports.page";
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
  declarations: [ ReportsPage ],
  providers: []
})
export class ReportsModule {}