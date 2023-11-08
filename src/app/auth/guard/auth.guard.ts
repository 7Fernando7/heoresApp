import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { state } from '@angular/animations';

@Injectable({ providedIn: 'root' })
export class Authguard implements CanMatch, CanActivate {

  constructor() { }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    console.log( 'Can Match' );
    console.log( route, segments );

    return true;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    console.log( 'Can Activate' );
    console.log( route, state);
    return true;
  }



}
