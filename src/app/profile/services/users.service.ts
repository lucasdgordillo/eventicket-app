import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/auth/models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private http: HttpClient
  ) {}

  getUserData(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/users/user-data`);
  }

  getUsersByCreator(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/users/by-creator-id`);
  }

  getProductorUsers(): Observable<any> {
    return this.http.get<any>(`${environment.baseApiUrl}/users/productor-users`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${environment.baseApiUrl}/users/${user.id}`, user);
  }
}