import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionsGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    
      return this.checkCookieSession();
    }

    checkCookieSession(): boolean{
      try{
        const token:boolean = this.cookieService.check('token')
        if(!token){
          this.router.navigate(['/','auth']) 
        }
        return token
      }catch(e){
        console.log('Algo Sucedio');
        return false
        
      }
    }

    
  
}
