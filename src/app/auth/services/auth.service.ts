import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { NewUser } from '../models/new-user.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  register(newUser: NewUser): Observable<any> {
    return this.http.post<any>(
      `${environment.baseApiUrl}/auth/register`, 
      newUser, 
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(take(1));
  }
}