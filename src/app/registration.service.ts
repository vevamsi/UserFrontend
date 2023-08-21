import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoggedUser } from './LoggedUser';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  
  private apiUrl = 'http://user-backend-env.eba-xzh78b7q.us-east-1.elasticbeanstalk.com'; // Your Spring Boot API URL
 // private apiUrl='http://localhost:8080';
   httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('user:password'),
       })
};
  loggedInUser: LoggedUser={
    email: '',
    user_id: 0
  };
// So your get request looks like this:



  constructor(private http: HttpClient) {}

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
    return this.http.get(`${this.apiUrl}/addresses`);
  }
  setLoggedInUser(user:LoggedUser) {
    this.loggedInUser = user;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }
  clearLoggedInUser() {
    sessionStorage.removeItem('loggedInUser');
    this.loggedInUser = { email: '', user_id: 0 };
  }
  getSessionUser(): any {
    const loggedInUserData = sessionStorage.getItem('loggedInUser');
    return loggedInUserData ? JSON.parse(loggedInUserData) : null;
}
  getUserProfile() {
    const loggedInUserId = this.loggedInUser.user_id; // Get the logged-in user's ID
    return this.http.get(`${this.apiUrl}/users/profile/${loggedInUserId}`);
  }
  updateProfile(profileData: any) {
    const loggedInUserId = this.loggedInUser.user_id;
    return this.http.post(`${this.apiUrl}/users/profile/${loggedInUserId}`, profileData,{responseType: 'text' as 'json'});
  }

  updatePassword(passwordData: any) {
    const loggedInUserId = this.loggedInUser.user_id;
    return this.http.post(`${this.apiUrl}/password/${loggedInUserId}`, passwordData,{responseType: 'text' as 'json'});
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
}