import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Purchase } from "src/app/events/models/purchase.interface";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  constructor(
    private http: HttpClient
  ) {}

  registerPurchase(purchaseData: Purchase): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/purchases/create`, purchaseData);
  }

  getAllPurchases() {
    return this.http.get<any>(`${environment.baseApiUrl}/purchases`);
  }

  getAllScannedPurchases() {
    return this.http.get<any>(`${environment.baseApiUrl}/purchases/scanned-purchases`);
  }

  verifyPurchaseCode(purchaseCode: string, date: string): Observable<any> {
    const params = {
      purchase_code: purchaseCode,
      scanned_date: date
    };

    return this.http.post<any>(`${environment.baseApiUrl}/purchases/validate-purchase`, params);
  }
}