import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';

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
  pageEvent!: PageEvent; // Page event for pagination
  itemsPerPage: number = 10;
  currentPage: number = 1;
  pagedUsers: User[] = [];
  sortKey: string = 'user_id';
  reverse: boolean = false;

  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.updateForm = this.fb.group({
      first_name: [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      city: [this.user.address.city, Validators.required],
      state: [this.user.address.state, Validators.required],
      country: [this.user.address.country, Validators.required],
      pincode: [this.user.address.pincode, Validators.required],
      departmentCode: [this.user.departmentCode, Validators.required],
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.registrationService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.updatePagedUsers();
      },
      error: (error) => {
        this.snackBar.open('Error Fetching Users', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching users:', error);
      },
    });
  }

  deleteUser(userId: number) {
    const snackBarRef = this.snackBar.open('Are you sure you want to delete this user?', 'Confirm', {
      duration: 5000, // Duration in milliseconds
    });
  
    snackBarRef.onAction().subscribe(() => {
      this.registrationService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
      });
    });
  }
  // Inside the TypeScript component
updateUserForm(user: User) {
  this.showUpdateForm = true;
  this.user = user; // Store the user object for updating
  this.updateForm.patchValue({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    city: user.address.city,
    state: user.address.state,
    country: user.address.country,
    pincode: user.address.pincode,
    departmentCode: user.departmentCode,
  });
}

  updateUser(user:User) {
    if (this.updateForm.invalid) {
      return;
    }
    const userData = this.updateForm.value;
    const user_id = user.user_id;
    this.registrationService.updateUser(user_id, userData).subscribe({
      next: (response: any) => {
        this.showUpdateForm = false;
        this.loadUsers();
      },
      error: (error: any) => {
        this.snackBar.open('Error Updating user', 'Close', {
          duration: 3000,
        });
        console.error('Error updating user:', error);
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageEvent = event;
    this.currentPage = event.pageIndex + 1;
    this.updatePagedUsers();
  }

  sortTable(column: string): void {
    this.sortKey = column;
    this.reverse = !this.reverse;
    this.updatePagedUsers();
  }

  updatePagedUsers(): void {
    const startIndex = this.pageEvent ? this.pageEvent.pageIndex * this.itemsPerPage : 0;
    let sortedUsers = [...this.users];
    sortedUsers = this.reverse
  ? sortedUsers.sort((a, b) => (a[this.sortKey as keyof User] < b[this.sortKey as keyof User] ? 1 : -1))
  : sortedUsers.sort((a, b) => (a[this.sortKey as keyof User] > b[this.sortKey as keyof User] ? 1 : -1));
    this.pagedUsers = sortedUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  isAdmin(user: User): boolean {
    return user.role === 'ADMIN';
  }
}
