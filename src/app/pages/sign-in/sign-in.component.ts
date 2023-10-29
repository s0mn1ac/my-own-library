/* Angular */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from '../../shared/services/auth.service';

/* Interfaces */
import { SignInInterface } from './interfaces/sign-in.interface';
import { SignInFormInterface } from './interfaces/sign-in-form.interface';

/* Enums */
import { SignInFormEnum } from './enums/sign-in-form.enum';
import { LoaderTypeEnum } from '../../shared/enums/loader-type.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  protected readonly SignInFormEnum: typeof SignInFormEnum = SignInFormEnum;
  protected readonly LoaderTypeEnum: typeof LoaderTypeEnum = LoaderTypeEnum;

  private _signInForm!: UntypedFormGroup;

  private _isSigningIn: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get signInForm(): UntypedFormGroup {
    return this._signInForm;
  }

  set signInForm(signInForm: UntypedFormGroup) {
    this._signInForm = signInForm;
  }

  get isSigningIn(): boolean {
    return this._isSigningIn;
  }

  set isSigningIn(isSigningIn: boolean) {
    this._isSigningIn = isSigningIn;
  }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initForm();
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickSignInWithEmailAndPassword(): void {
    if (this.isSigningIn) {
      return;
    }
    this.isSigningIn = true;
    const signIn: SignInInterface = this.signInForm.value;
    this.authService.signInWithEmailAndPassword(signIn.email, signIn.password)
      .then(() => this.router.navigate(['/home']).then())
      .catch((error: Error) => console.error(error))
      .finally((): boolean => this.isSigningIn = false);
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private initForm(): void {
    this.signInForm = new FormGroup<SignInFormInterface>({
      email: new FormControl({ value: null, disabled: false }, [Validators.required]),
      password: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

}
