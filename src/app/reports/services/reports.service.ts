import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(
    private http: HttpClient
  ) {}

  getRrppReport(params) {
    return this.http.post<any>(`${environment.baseApiUrl}/reports/rrpps-report`, params);
  }

  getSalesReport(params) {
    return this.http.post<any>(`${environment.baseApiUrl}/reports/ticket-sales-report`, params);
  }

  getTicketsQuantityByProvince(params) {
    return this.http.post<any>(`${environment.baseApiUrl}/reports/purchases-by-province-report`, params);
  }
}