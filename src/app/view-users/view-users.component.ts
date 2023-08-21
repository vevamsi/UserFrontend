import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private registrationService: RegistrationService,private router: Router) {}

  ngOnInit() {
    this.loadUsers()
  }
    loadUsers(){
    this.registrationService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
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
}
