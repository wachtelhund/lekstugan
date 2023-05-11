import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IUser} from '../types/IUser';
import {IUserPayload} from '../types/IUserPayload';
import {environment} from '../../environments/environment';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import {BehaviorSubject, Observable, catchError, map, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for handling authentication.
 */
export class AuthService {
  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {}
  apiURL = environment.authApiURL;
  currentUser: BehaviorSubject<IUserPayload | null> =
    new BehaviorSubject<IUserPayload | null>(null);
  token: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);


  /**
   * Login a user.
   *
   * @param {IUser} user - The user to login.
   * @return {Observable<IUserPayload>} - The response.
   */
  login(user: IUser) {
    return this.http
        .post<ILoginResponse>(`${this.apiURL}/login`, user).pipe(
            map((res) => {
              this.token.next(res.access_token as string);
              const decodedToken = jwtDecode<JwtPayload>(res.access_token);
              const payLoad = decodedToken as IUserPayload;
              localStorage.setItem('token', this.token.value || '');
              this.currentUser.next(payLoad);
              return payLoad;
            }),
            catchError((err) => {
              console.error('Error logging in', err);
              return of(null);
            })
        );
  }

  /**
   * Gets all registered admins.
   *
   * @return {Observable<any>} - The response.
   */
  getAdmins(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiURL}/users`,
    // eslint-disable-next-line
      {headers: {Authorization: 'Bearer ' + this.token.value}});
  }

  /**
   * Remove an admin.
   *
   * @param {string} email - The email of the admin to remove.
   * @return {Observable<any>} - The response.
   */
  deleteAdmin(email: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${email}`,
    // eslint-disable-next-line
    {headers: {Authorization: 'Bearer ' + this.token.value}});
  }

  /**
   * Add an admin.
   *
   * @param {IUser} user - The user to add.
   * @return {Observable<any>} - The response.
   */
  addAdmin(user: IUser): Observable<any> {
    return this.http.post(`${this.apiURL}/add`,
        {user},
        // eslint-disable-next-line
        {headers: {Authorization: 'Bearer ' + this.token.value}});
  }
}
export interface ILoginResponse {
  // eslint-disable-next-line
  access_token: string;
}
