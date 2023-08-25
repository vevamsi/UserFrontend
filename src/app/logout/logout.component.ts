// logout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(private registrationService: RegistrationService, private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.registrationService.clearLoggedInUser();
    this.snackBar.open('Logged Out Successfully', 'Close', {
      duration: 3000, // Display duration in milliseconds
    });
    this.router.navigate(['/login']);
  }
}
