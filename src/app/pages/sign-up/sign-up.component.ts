/* Angular */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from '../../shared/services/auth.service';

/* Interfaces */
import { SignUpInterface } from './interfaces/sign-up.interface';
import { SignUpFormInterface } from './interfaces/sign-up-form.interface';

/* Enums */
import { SignUpFormEnum } from './enums/sign-up-form.enum';
import { LoaderTypeEnum } from '../../shared/enums/loader-type.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  protected readonly SignUpFormEnum: typeof SignUpFormEnum = SignUpFormEnum;
  protected readonly LoaderTypeEnum: typeof LoaderTypeEnum = LoaderTypeEnum;

  private _signUpForm!: UntypedFormGroup;

  private _isSigningUp: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initForm();
  }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get signUpForm(): UntypedFormGroup {
    return this._signUpForm;
  }

  set signUpForm(signUpForm: UntypedFormGroup) {
    this._signUpForm = signUpForm;
  }

  get isSigningUp(): boolean {
    return this._isSigningUp;
  }

  set isSigningUp(isSigningUp: boolean) {
    this._isSigningUp = isSigningUp;
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public createUserWithEmailAndPassword(): void {
    if (this.isSigningUp) {
      return;
    }
    this.isSigningUp = true;
    const signUp: SignUpInterface = this.signUpForm.value;
    this.authService.createUserWithEmailAndPassword(signUp.email, signUp.password)
      .then(() => this.router.navigate(['/home']).then())
      .catch((error: Error) => console.error(error))
      .finally((): boolean => this.isSigningUp = false);
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private initForm(): void {
    this.signUpForm = new FormGroup<SignUpFormInterface>({
      email: new FormControl({ value: null, disabled: false }, [Validators.required]),
      name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      password: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

}
