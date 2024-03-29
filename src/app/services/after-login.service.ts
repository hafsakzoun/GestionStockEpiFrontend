import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';


@Injectable({
  providedIn: 'root'
})

export class AfterLoginService {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.loggedIn() && this.tokenService.isUser()) {
      return true;
    }

    return false;
  }
}
