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
}