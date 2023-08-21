// logout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(private registrationService: RegistrationService, private router: Router) {}

  ngOnInit() {
    this.registrationService.clearLoggedInUser();
    this.router.navigate(['/login']);
  }
}
