import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventCategory } from "src/app/profile/models/event-category.interface";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(
    private http: HttpClient
  ) {}

  createCategory(category: EventCategory): Observable<any> {
    return this.http.post<EventCategory>(`${environment.baseApiUrl}/event-categories/create`, category);
  }

  editCategory(category: EventCategory): Observable<any> {
    return this.http.put<EventCategory>(`${environment.baseApiUrl}/event-categories/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<EventCategory>(`${environment.baseApiUrl}/event-categories/${id}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/event-categories`);
  }
}