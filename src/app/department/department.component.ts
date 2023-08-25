import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Department } from '../department'; // Import the Department interface
import { User } from '../user'; // Import the User interface

@Component({
  selector: 'app-departments',
  templateUrl: './department.component.html',
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  departmentForm: FormGroup = new FormGroup({
    departmentName: new FormControl('', Validators.required),
    departmentCode: new FormControl('', Validators.required),
  });
  selectedDepartment: Department | null = null;
  departmentUsers: User[] = []; // To store the department users

  constructor(
    private registrationService: RegistrationService
  ) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.registrationService.getAllDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  createDepartment() {
    const formData = this.departmentForm.value;
    this.registrationService.createDepartment(formData).subscribe(() => {
      this.loadDepartments();
      this.departmentForm.reset();
    });
  }

  selectDepartment(department: Department) {
    this.selectedDepartment = department;
    this.loadDepartmentUsers(department.departmentCode);
  }

  loadDepartmentUsers(departmentCode: string) {
    this.registrationService.getDepartmentUsers(departmentCode).subscribe((users) => {
      this.departmentUsers = users;
    });
  }
}
