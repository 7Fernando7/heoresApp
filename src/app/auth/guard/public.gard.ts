import { Observable, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { state } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  private checkAuthPublicStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
    .pipe(
      tap( isAutenticated => {
        if( isAutenticated ) {
          this.router.navigate(['./']);
        }
      }),
      map( isAutenticated => !isAutenticated )
    )
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthPublicStatus();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
      return this.checkAuthPublicStatus();
  }



}
