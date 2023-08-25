import { Inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RegistrationService } from './app/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(@Inject(RegistrationService) private registrationService: RegistrationService,private snackBar: MatSnackBar) {}

  canActivate(): boolean {
    if (this.registrationService.isAdmin()) {
      return true;
    } else {
      // Handle unauthorized access (e.g., navigate to a different page)
      this.snackBar.open('You need admin access', 'Close', {
        duration: 3000, // Display duration in milliseconds
      });
      
     // alert('You need admin access');
      return false;
    }
  }
}
