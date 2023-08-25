import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];
  showUpdateForm = false;
  updateForm!: FormGroup;
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
    departmentCode: '',
    role: ''
  };
  constructor(private registrationService: RegistrationService,private fb: FormBuilder,private router: Router,private snackBar: MatSnackBar) {
    this.updateForm = this.fb.group({
      first_name: [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      city: [this.user.address.city, Validators.required],
      state: [this.user.address.state, Validators.required],
      country: [this.user.address.country, Validators.required],
      pincode: [this.user.address.pincode, Validators.required]
      // Add other fields here...
    });
  }

  ngOnInit() {
    this.loadUsers()
  }
    loadUsers(){
    this.registrationService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.snackBar.open('Error Fetching Users', 'Close', {
          duration: 3000, // Display duration in milliseconds
        });
        
        console.error('Error fetching users:', error);
      },
    });
  }
  // logout() {
  //   this.registrationService.clearLoggedInUser();
  //   this.router.navigate(['/login']);
  // }
  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.registrationService.deleteUser(userId).subscribe(() => {
        // Reload the users after deletion
        this.loadUsers();
      });
    }
  }
  updateUser(userid:number) {
    if (this.updateForm.invalid) {
      return;
    }
    const userData = this.updateForm.value;
    const user_id = userid/* Get the user_id from the selected user */;
    this.registrationService.updateUser(user_id, userData).subscribe({
      next: (response :any ) => {
        this.showUpdateForm = false;
        this.loadUsers();
      },
      error: (error: any) => {
        this.snackBar.open('Error Updating user', 'Close', {
          duration: 3000, // Display duration in milliseconds
        });
        
        console.error('Error updating user:', error);
      },
    });
  }
  isAdmin(user: User): boolean {
    return user.role === 'ADMIN';
  }

}
