import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    get istester() {
        // console.log(this.user);
        return this.user && this.user.role === Role.tester;
      }
      get isdeveloper() {
        // console.log(this.user);
        return this.user && this.user.role === Role.developer;
      }
    get isAdmin() {
        // console.log(this.user)
        return this.user && this.user.role === Role.manager;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}