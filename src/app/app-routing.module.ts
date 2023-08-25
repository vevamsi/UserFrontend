import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { CanDeactivateGuard } from 'src/can-deactivate.guard';
import { AdminGuard } from 'src/admin.gaurd';
import { DepartmentsComponent } from './department/department.component';

const routes: Routes = [
  {   path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent ,canDeactivate: [CanDeactivateGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password/:user_id', component: ResetPasswordComponent},
  { path: 'view-users', component: ViewUsersComponent,canActivate: [AdminGuard]},
  {path: 'department',component:DepartmentsComponent,canActivate: [AdminGuard]},
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
