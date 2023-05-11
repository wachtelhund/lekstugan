import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IUser} from '../types/IUser';
import {IUserPayload} from '../types/IUserPayload';
import {environment} from '../../environments/environment';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import {BehaviorSubject, catchError, map, of} from 'rxjs';

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
}

export interface ILoginResponse {
  // eslint-disable-next-line
  access_token: string;
}
