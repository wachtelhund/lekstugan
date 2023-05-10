import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, Router, RouterStateSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

/**
 * Authentication Guard for protecting routes
 * based on user authentication status.
 *
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Authentication Guard for protecting routes
 * based on user authentication status.
 */
export class AuthGuard {
  /**
  * Constructor.
  *
  * @param {AuthService} authService - The authentication service
  * to check the user's authentication status.
  * @param {Router} router - The router for navigating between routes.
  */
  constructor(private authService: AuthService, private router: Router) {}

  /**
  * Determines whether the user can access a route.
  *
  * @param {ActivatedRouteSnapshot} route - The route the user is
  * trying to access.
  * @param {RouterStateSnapshot} state - The current router state.
  * @return {(Observable<boolean> | Promise<boolean> | boolean)} - True if the
  * user can access the route, false otherwise.
  */
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authService.currentUser.value;

    if (currentUser && currentUser.x_permission_level === 8) {
      return true;
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}

