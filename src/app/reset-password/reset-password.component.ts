import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  user_id: number = -1;

  constructor(private fb: FormBuilder,  private userService: RegistrationService, private route: ActivatedRoute,private router:Router,private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('user_id')) { // Change 'id' to 'user_id'
      this.user_id = +this.route.snapshot.paramMap.get('user_id')!;
    }
    this.initForm();
  }

  initForm() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  resetPassword() {
    const newPassword = this.resetPasswordForm.get('password')?.value;

    this.userService.resetPassword(this.user_id, newPassword).subscribe({
      next:  response  => {
        // Handle success (e.g., show success message)
        this.snackBar.open('Password reset successfully', 'Close', {
          duration: 3000, // Display duration in milliseconds
        });
        
        //alert("success");
        this.router.navigate(['/login']);
      },
      error: error=> {
        // Handle error (e.g., show error message)
        this.snackBar.open('Password reset error', 'Close', {
          duration: 3000, // Display duration in milliseconds
        });
        
        console.error('password reset error:', error);
      }
  });
  }
}
