import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';
import { UserResponse } from '../models/user-response.model';
import jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private user$ = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(newUser: User): Observable<any> {
    return this.http.post<any>(
      `${environment.baseApiUrl}/auth/register`, 
      newUser, 
      this.httpOptions
    ).pipe(take(1));
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(
        `${environment.baseApiUrl}/auth/login`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        take(1),
        tap((response: { token: string }) => {
          Storage.set({
            key: 'token',
            value: response.token,
          });
          const decodedToken: UserResponse = jwt_decode(response.token);
          Storage.set({
            key: 'role',
            value: decodedToken.user.role ? decodedToken.user.role : Role.USER
          });
          this.user$.next(decodedToken.user);
        })
      );
  }

  getUserRole(): Observable<any> {
    return from(Storage.get({ key: 'role' })).pipe(
      map((data: { value: string }) => {
        return data.value;
      })
    );
  }

  getUserId(): Observable<any> {
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        return of(user?.id);
      })
    );
  }

  get isUserLoggedIn(): Observable<boolean> {
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        const isUserAuthenticated = user !== null;
        return of(isUserAuthenticated);
      })
    );
  }

  isTokenInStorage(): Observable<boolean> {
    return from(
      Storage.get({
        key: 'token',
      })
    ).pipe(
      map((data: { value: string }) => {
        if (!data || !data.value) return null;

        const decodedToken: UserResponse = jwt_decode(data.value);
        const jwtExpirationInMsSinceUnixEpoch = decodedToken.exp * 1000;
        const isExpired =
          new Date() > new Date(jwtExpirationInMsSinceUnixEpoch);

        if (isExpired) return null;
        if (decodedToken.user) {
          this.user$.next(decodedToken.user);
          return true;
        }
      })
    );
  }

  logout(): void {
    this.user$.next(null);
    Storage.remove({ key: 'token' });
    Storage.remove({ key: 'role' });
    this.router.navigateByUrl('/');
  }
}