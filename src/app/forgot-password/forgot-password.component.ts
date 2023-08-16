import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  message: string = '';


  constructor(private fb: FormBuilder,private router:Router, private registrationService: RegistrationService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForm() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

     const email = this.forgotPasswordForm.get('email')?.value;

    this.registrationService.forgotPassword(email).subscribe({
      next: response => {
        const user_id = response.user_id; // Assuming the backend returns the user ID
      this.router.navigate(['/reset-password', user_id]);
        
      },
      error: error => {
        this.message = 'An error occurred. Please try again later.';
      }
  });
  }
}
