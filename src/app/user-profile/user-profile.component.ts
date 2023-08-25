import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  // user:any;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  showUpdateProfileForm = false;
  showUpdatePasswordForm = false;
  errorMessage: string | undefined;
  user: User = {
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    address: {
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    departmentCode: "",
    role: ""
  };
  
  constructor(private fb: FormBuilder, private registrationService: RegistrationService,private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadUserProfile();
    this.initProfileForm();
    this.initPasswordForm();
  }
  // ngOnDestroy() {
  //   // Automatically log out when leaving the user profile page
  //   this.registrationService.clearLoggedInUser();
  // }

  loadUserProfile() {
    const loggedInUserId = this.registrationService.getLoggedInUser().user_id;
  if (loggedInUserId) {
    this.registrationService.getUserProfile().subscribe({
      next: (response: any) => {
        const user: User = response;
        if (user && user.address) {
        this.user = user;
        this.profileForm.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          address: {
            city: user.address.city,
            state: user.address.state,
            country: user.address.country,
            pincode: user.address.pincode,
          },
          departmentCode: user.departmentCode,
          role: user.role
        });
      }
      },
      error: (error) => {
        console.error('Unable to load profile error:', error);
      }
    });
  }
}
  
  
  
  

  initProfileForm() {
    // Initialize profileForm with current user data
    this.profileForm = this.fb.group({
      first_name: [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      city: [this.user.address.city, Validators.required],
      state: [this.user.address.state, Validators.required],
      country: [this.user.address.country, Validators.required],
      pincode: [this.user.address.pincode, Validators.required]
      // Other profile fields
    });
  }
  

  initPasswordForm() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  updateProfile() {
    // if (this.profileForm.invalid) {
    //   return;
    // }
    const loggedInUserId = this.registrationService.getLoggedInUser().user_id;
    this.registrationService.updateProfile(this.profileForm.value).subscribe(
      {
        next: response => {
          // Handle successful login response (response will be the token or message)
         // alert('Finally,update Successfullllll,Go for it.....!')
         this.snackBar.open('Profile Updated successfully', 'Close', {
          duration: 3000, // Display duration in milliseconds
        });
        
          this.router.navigate(['/login']);
          console.log('update success:', response);
        },
        error: error => {
          console.error('update error: this is the updated message', error);
          this.snackBar.open('Update failed!Please check your details!', 'Close', {
            duration: 3000, // Display duration in milliseconds
          });
          
          this.errorMessage = 'update failed!Please check your details!';
        }
      });
  }
  toggleUpdateProfileForm() {
    this.showUpdateProfileForm = !this.showUpdateProfileForm;
    if (!this.showUpdateProfileForm) {
      this.profileForm.reset();
    }
  }

  toggleUpdatePasswordForm() {
    this.showUpdatePasswordForm = !this.showUpdatePasswordForm;
    if (!this.showUpdatePasswordForm) {
      this.passwordForm.reset();
    }
  }

  updatePassword() {
    // if (this.passwordForm.invalid) {
    //   return;
    // }
    const loggedInUserId = this.registrationService.getLoggedInUser().user_id;
    this.registrationService.updatePassword(this.passwordForm.value).subscribe(
      {
        next: response => {
          // Handle successful login response (response will be the token or message)
        //  alert('Finally,password update Successfullllll,Go for it.....!')
        this.snackBar.open('Password update successful', 'Close', {
          duration: 3000, // Display duration in milliseconds
        });
        
          console.log('update success:', response);
        },
        error: error => {
          this.snackBar.open('Password update error', 'Close', {
            duration: 3000, // Display duration in milliseconds
          });
          
          console.error('password update error:', error);
         // alert('Please provide valid Password!')
          this.errorMessage = 'update failed!Please check your details!';
        }
      });
  }
}
