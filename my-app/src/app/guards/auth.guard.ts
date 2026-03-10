import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Authservice } from '../myservice/authservice';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: Authservice, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if route requires employee role
    if (route.data['requiresEmployee']) {
      const user = this.authService.getCurrentUser();
      if (user?.role !== 'employee') {
        this.router.navigate(['/shopping']);
        return false;
      }
    }

    return true;
  }
}