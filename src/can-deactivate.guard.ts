import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserProfileComponent } from './app/user-profile/user-profile.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<UserProfileComponent> {
  canDeactivate(component: UserProfileComponent): boolean {
    if (component.profileForm.dirty || component.passwordForm.dirty) {
      return window.confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
}
