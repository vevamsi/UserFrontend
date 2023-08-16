
import { ReactiveFormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isSubmitting: boolean=false;
  errorMessage: string | undefined;
 

  constructor(private fb: FormBuilder,private router:Router, private registrationService: RegistrationService) {}
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm= new FormGroup({
      email: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]),
      password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;

    this.registrationService.loginUser(email, password).subscribe({
      next: response => {
        // Handle successful login response (response will be the token or message)
        const loggedInUser = { email: this.loginForm.value.email, user_id: response };
        this.registrationService.setLoggedInUser(loggedInUser);
        this.router.navigate(['/profile']);
        alert('Finally,Login Successfullllll,Go and Sleep.....!')
        console.log('Login success:', loggedInUser);
      },
      error: error => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
    
    
    
    
    

    }


  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return  field !== null &&field?.invalid && (field?.dirty || field?.touched);
  }
}
