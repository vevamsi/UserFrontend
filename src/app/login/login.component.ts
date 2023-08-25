
import { ReactiveFormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isSubmitting: boolean=false;
  errorMessage: string | undefined;
 

  constructor(private fb: FormBuilder,private router:Router, private registrationService: RegistrationService,private snackBar: MatSnackBar) {}
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
      next: (response :any) => {
        // Handle successful login response (response will be the token or message)
     //   const loggedInUser = { email: this.loginForm.value.email, user_id: response };
        // const loggedInUser = {
        //   email: this.loginForm.value.email,
        //   user_id: response.user_id, // Assuming the response has a user_id property
        //   role: response.role // Assuming the response has a role property
        // };
        const responseObject = JSON.parse(response);
      
      // Extract user_id and role properties
      const loggedInUser = {
        email: this.loginForm.value.email,
        user_id: responseObject.user_id,
        role: responseObject.role
      };
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        this.snackBar.open('Bravo!Login successfull', 'Close', {
          duration: 3000, // Display duration in milliseconds
        });
        this.registrationService.setLoggedInUser(loggedInUser);
        this.router.navigate(['/profile']);
       // alert('Finally,Login Successfullllll,Go and Sleep.....!')
      
        console.log('Login success:', loggedInUser);
      },
      error: error => {
        this.snackBar.open('Login failed. Please check your credentials', 'Close', {
          duration: 3000, // Display duration in milliseconds
        });
        
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
