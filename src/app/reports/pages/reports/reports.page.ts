import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'reports-page',
  templateUrl: 'reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  goToReportPage(route: string) {
    this.router.navigate([route]);
  }
}