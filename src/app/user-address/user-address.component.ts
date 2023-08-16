import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
})
export class UserAddressComponent implements OnInit {
  userAddresses: any[]=[];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit() {
    this.loadUserAddresses();
  }

  loadUserAddresses() {
    this.registrationService.getUserAddresses().subscribe(
      response => {
        this.userAddresses = response;
      },
      error => {
        // Handle error
      }
    );
  }
}
