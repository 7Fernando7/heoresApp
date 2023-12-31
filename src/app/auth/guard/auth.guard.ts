import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { state } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
    .pipe(
      tap( isAutenticated => {
        if( !isAutenticated ) {
          this.router.navigate(['./auth/login']);
        }
      })
    )
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log( 'Can Match' );
    // console.log( route, segments );
    // return true;

    return this.checkAuthStatus();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log( 'Can Activate' );
    // console.log( route, state);
    // return true;

    return this.checkAuthStatus();
  }



}
