import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventCategory } from "src/app/profile/models/event-category.interface";
import { EventPlace } from "src/app/profile/models/event-place.interface";
import { Rrpp } from "src/app/profile/models/rrpp.interface";
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

  createEventPlace(eventPlace: EventPlace): Observable<any> {
    return this.http.post<EventPlace>(`${environment.baseApiUrl}/event-places/create`, eventPlace);
  }

  editEventPlace(eventPlace: EventPlace): Observable<any> {
    return this.http.put<EventPlace>(`${environment.baseApiUrl}/event-places/${eventPlace.id}`, eventPlace);
  }

  deleteEventPlace(id: number): Observable<any> {
    return this.http.delete<EventPlace>(`${environment.baseApiUrl}/event-places/${id}`);
  }

  getAllEventPlaces(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/event-places`);
  }

  createRrpp(rrpp: Rrpp): Observable<any> {
    return this.http.post<Rrpp>(`${environment.baseApiUrl}/rrpps/create`, rrpp);
  }

  editRrpp(rrpp: Rrpp): Observable<any> {
    return this.http.put<Rrpp>(`${environment.baseApiUrl}/rrpps/${rrpp.id}`, rrpp);
  }

  deleteRrpp(id: number): Observable<any> {
    return this.http.delete<Rrpp>(`${environment.baseApiUrl}/rrpps/${id}`);
  }

  getAllRrpps(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/rrpps`);
  }

  getAllRrppsByProductor(productorId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/rrpps/by-productor/${productorId}`);
  }

  createEvent(event: Event): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}/events/create`, event);
  }

  getAllEvents(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/events`);
  }

  getEventById(eventId): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/events/${eventId}`);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseApiUrl}/events/${id}`);
  }
}