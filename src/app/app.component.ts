// Inside app.component.ts
import { Component } from '@angular/core';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
 title="User-Frontend";
  loggedInUser: any;

  constructor(public registrationService: RegistrationService) {}

  ngOnInit() {
    // Retrieve user data from LocalStorage
    this.loggedInUser = this.registrationService.getSessionUser();
  }
}
