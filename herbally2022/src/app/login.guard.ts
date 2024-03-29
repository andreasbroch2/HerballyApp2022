import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter, map, take } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      return this.authService.isAuthenticated.pipe(
        filter((val) => val !== null), // Filter out initial Behaviour subject value
        take(1), // Otherwise the Observable doesn't complete!
        map((isAuthenticated) => {
          if (isAuthenticated) {
              return true;
          } else {
            this.router.navigateByUrl("/login");
            return false;
          }
        })
      );
  }
}
