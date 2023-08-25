import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoggedUser } from './LoggedUser';
import { User } from './user';
import { Department } from './department';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  
  private awsUrl='https://l5bweize0l.execute-api.us-east-1.amazonaws.com/prod'
 // private apiUrl = 'http://user-backend-env.eba-xzh78b7q.us-east-1.elasticbeanstalk.com'; // Your Spring Boot API URL
  private apiUrl='http://localhost:8080';

   httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:password'),
       })
};
  loggedInUser: LoggedUser={
    email: '',
    user_id: 0,
    role:''
  };
// So your get request looks like this:

isLoggedIn(): boolean {
  return this.getLoggedInUser() !== null;
}


  constructor(private http: HttpClient) {
    const loggedInUserData = this.getSessionUser();
  if (loggedInUserData) {
    this.loggedInUser = loggedInUserData;
  }

  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, userData);
  }

  // loginUser(email: string, password: string): Observable<any> {
  //   const loginData = { email, password };
  //   return this.http.post(`${this.apiUrl}/users/login`, loginData,{responseType: 'text' as 'json'});
  // }
  loginUser(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/users/login`, loginData, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('user:password'), // Add basic authentication header
      }),
      responseType: 'text' as 'json',
    });
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/getAll`, this.httpOptions);
  }
  
  updateUserProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/profile`, profileData,{responseType: 'text' as 'json'});
  }
  changePassword(passwordData: any): Observable<any> {
    const url = `${this.apiUrl}/change-password`; // Replace with your API endpoint
    return this.http.post(url, passwordData,this.httpOptions);
  }
  getUserAddresses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/addresses`);
  }
  setLoggedInUser(user:LoggedUser) {
    this.loggedInUser = user;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }
  clearLoggedInUser() {
    sessionStorage.removeItem('loggedInUser');
    this.loggedInUser = { email: '', user_id: 0,role:'' };
  }
  getSessionUser(): any {
    const loggedInUserData = sessionStorage.getItem('loggedInUser');
    return loggedInUserData ? JSON.parse(loggedInUserData) : null;
}
  getUserProfile():Observable<User> {
    const loggedInUserId = this.loggedInUser.user_id; // Get the logged-in user's ID
    return this.http.get<User>(`${this.apiUrl}/users/profile/${loggedInUserId}`,{responseType:'json'});
  }
  updateProfile(profileData: any) {
    const loggedInUserId = this.loggedInUser.user_id;
    return this.http.post(`${this.apiUrl}/users/profile/${loggedInUserId}`, profileData,{responseType: 'text' as 'json'});
  }
  updateUser(user_id: number, userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/update/${user_id}`, userData,{responseType: 'text' as 'json'});
  }
  updatePassword(passwordData: any) {
    const loggedInUserId = this.loggedInUser.user_id;
    return this.http.post(`${this.apiUrl}/users/password/${loggedInUserId}`, passwordData,{responseType: 'text' as 'json'});
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/forgot`, { email: email });
}


  resetPassword(user_id: number, newPassword: string): Observable<any> {
    const passwordData = { password: newPassword };
    return this.http.put(`${this.apiUrl}/users/reset/${user_id}`, passwordData,{responseType: 'text' as 'json'});

  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/delete/${userId}`,this.httpOptions);
  }
  isAdmin(): boolean {
    const loggedInUser = this.getLoggedInUser();
    return loggedInUser && loggedInUser.role === 'ADMIN';
  }
  createDepartment(departmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/saveDepartment`, departmentData);
  }

  getDepartmentUsers(departmentCode: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/departmentUsers/${departmentCode}`);
  }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/users/getAllDepartments`);
  }
}

//AWS METHODS
// createDepartment(departmentData: any): Observable<any> {
//   return this.http.post(`${this.awsUrl}/user-service/saveDepartment`, departmentData);
// }

// getDepartmentUsers(departmentCode: string): Observable<User[]> {
//   return this.http.get<User[]>(`${this.awsUrl}/user-service/departmentUsers/${departmentCode}`);
// }

// getAllDepartments(): Observable<Department[]> {
//   return this.http.get<Department[]>(`${this.awsUrl}/user-service/getAllDepartments`);
// }
// registerUser(userData: any): Observable<any> {
//   return this.http.post(`${this.awsUrl}/user-service/register`, userData);
// }

// // loginUser(email: string, password: string): Observable<any> {
// //   const loginData = { email, password };
// //   return this.http.post(`${this.awsUrl}/users/login`, loginData,{responseType: 'text' as 'json'});
// // }
// loginUser(email: string, password: string): Observable<any> {
//   const loginData = { email, password };
//   return this.http.post(`${this.awsUrl}/user-service/login`, loginData, {
//     headers: new HttpHeaders({
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + btoa('user:password'), // Add basic authentication header
//     }),
//     responseType: 'text' as 'json',
//   });
// }
// getAllUsers(): Observable<User[]> {
//   return this.http.get<User[]>(`${this.awlUrl}/user-service/getAll`, this.httpOptions);
// }

// updateUserProfile(profileData: any): Observable<any> {
//   return this.http.post(`${this.awsUrl}/user-service/profile`, profileData,{responseType: 'text' as 'json'});
// }
// changePassword(passwordData: any): Observable<any> {
//   const url = `${this.awsUrl}/user-service/change-password`; // Replace with your API endpoint
//   return this.http.post(url, passwordData,this.httpOptions);
// }
// getUserAddresses(): Observable<any> {
//   return this.http.get(`${this.awsUrl}/user-service/addresses`);
// }
// getUserProfile():Observable<User> {
//   const loggedInUserId = this.loggedInUser.user_id; // Get the logged-in user's ID
//   return this.http.get<User>(`${this.awsUrl}/user-service/profile/${loggedInUserId}`,{responseType:'json'});
// }
// updateProfile(profileData: any) {
//   const loggedInUserId = this.loggedInUser.user_id;
//   return this.http.post(`${this.awsUrl}/user-service/profile/${loggedInUserId}`, profileData,{responseType: 'text' as 'json'});
// }
// updateUser(user_id: number, userData: any): Observable<any> {
//   return this.http.post(`${this.awsUrl}/user-service/update/${user_id}`, userData,{responseType: 'text' as 'json'});
// }
// updatePassword(passwordData: any) {
//   const loggedInUserId = this.loggedInUser.user_id;
//   return this.http.post(`${this.awsUrl}/user-service/password/${loggedInUserId}`, passwordData,{responseType: 'text' as 'json'});
// }
// forgotPassword(email: string): Observable<any> {
//   return this.http.post(`${this.awsUrl}/user-service/forgot`, { email: email });
// }


// resetPassword(user_id: number, newPassword: string): Observable<any> {
//   const passwordData = { password: newPassword };
//   return this.http.put(`${this.awsUrl}/user-service/reset/${user_id}`, passwordData,{responseType: 'text' as 'json'});

// }
// deleteUser(userId: number): Observable<any> {
//   return this.http.delete(`${this.awsUrl}/user-service/delete/${userId}`,this.httpOptions);
// }