import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoggedUser } from './LoggedUser';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {

  
  private apiUrl = 'http://user-backend-env.eba-xzh78b7q.us-east-1.elasticbeanstalk.com'; // Your Spring Boot API URL
   httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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

  loginUser(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/users/login`, loginData,{responseType: 'text' as 'json'});
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
    return this.http.post(`${this.apiUrl}/users`, { email });
  }
  resetPassword(user_id: number, newPassword: string): Observable<any> {
    const passwordData = { password: newPassword };
    return this.http.put(`${this.apiUrl}/users/password/${user_id}`, passwordData);

  }
}