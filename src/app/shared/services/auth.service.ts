/* Angular */
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from '@angular/fire/auth';

/* Firebase */
import { UserCredential, GoogleAuthProvider } from '@firebase/auth';

/* Services */
import { DispatcherService } from './dispatcher.service';

/* Interfaces */
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private dispatcherService: DispatcherService
  ) {
    this.initAuthSubscription();
  }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get currentUser(): User | null {
    return this.auth.currentUser;
  }


  /* ----- Sign Up ---------------------------------------------------------------------------------------------------------------------- */

  public createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }


  /* ----- Sign In ---------------------------------------------------------------------------------------------------------------------- */

  public signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public signInWithPopup(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }


  /* ----- Sign Out --------------------------------------------------------------------------------------------------------------------- */

  public signOut(): Promise<void> {
    return signOut(this.auth);
  }


  /* ----- Update profile --------------------------------------------------------------------------------------------------------------- */

  public updateDisplayName(displayName: string): Promise<void> | undefined {

    if (this.auth.currentUser === null) {
      return;
    }

    return updateProfile(this.auth.currentUser, { displayName: displayName });
  }

  public updatePhotoURL(photoURL: string): Promise<void> | undefined {

    if (this.auth.currentUser === null) {
      return;
    }

    return updateProfile(this.auth.currentUser, { photoURL: photoURL });
  }


  /* ----- Subscriptions ---------------------------------------------------------------------------------------------------------------- */

  private initAuthSubscription(): void {
    this.auth.onAuthStateChanged((user: User | null) => this.dispatcherService.updateUser(this.buildUser(user)));
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private buildUser(user: User | null): UserInterface | null {

    if (user === null) {
      return null;
    }

    return {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      uid: user.uid
    };
  }

}
