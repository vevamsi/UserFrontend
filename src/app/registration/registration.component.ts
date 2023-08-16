import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registrationForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required)
    });
  }
  
  // passwordMatchValidator(group: FormGroup) {
  //   const passwordControl = group.get('password');
  //   const confirmPasswordControl = group.get('confirmPassword');
  
  //   if (!passwordControl || !confirmPasswordControl) {
  //     // Return null if either control is null
  //     return null;
  //   }
  
  //   const password = passwordControl.value;
  //   const confirmPassword = confirmPasswordControl.value;
  //   return password === confirmPassword ? null : { passwordMismatch: true };
  // }
  registerUser() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.isSubmitting = true;

     const { first_name,last_name, email, password ,city,state,country,pincode}  = this.registrationForm.value;
    const userData={first_name,last_name, email, password ,city,state,country,pincode};
    this.registrationService.registerUser(userData).subscribe({
      next: response => {
        // Handle successful login response (response will be the token or message)
        alert('Finally,Register Successfullllll,Go for Lunch.....!')
        this.router.navigate(['/login']);
        console.log('Registration success:', response);
        this.isSubmitting = false;
      },
      error: error => {
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed. Please check your credentials.';
        this.isSubmitting = false;
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return  field !== null && field?.invalid && (field?.dirty || field?.touched);
  }
}
