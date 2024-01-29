/* Angular */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* Services */
import { AuthService } from '../../shared/services/auth.service';
import { ConfigurationsService } from '../../shared/services/configurations.service';

/* Interfaces */
import { SignInInterface } from './interfaces/sign-in.interface';
import { SignInFormInterface } from './interfaces/sign-in-form.interface';

/* Enums */
import { SignInFormEnum } from './enums/sign-in-form.enum';
import { ErrorEnum } from '../../shared/enums/error.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  protected readonly SignInFormEnum: typeof SignInFormEnum = SignInFormEnum;
  protected readonly ErrorEnum: typeof ErrorEnum = ErrorEnum;

  private _form!: UntypedFormGroup;

  private _isLoading: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly configurationsService: ConfigurationsService,
    private readonly router: Router
  ) { }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get form(): UntypedFormGroup {
    return this._form;
  }

  set form(form: UntypedFormGroup) {
    this._form = form;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initForm();
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickSignInWithEmailAndPassword(): void {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    const signIn: SignInInterface = this.form.value;
    this.authService.signInWithEmailAndPassword(signIn.email, signIn.password)
      .then(() => this.configurationsService.getConfiguration(this.authService.currentUser)
        ?.then(() => this.router.navigate(['/home']).then()))
      .catch((error: Error) => console.error(error))
      .finally((): boolean => this.isLoading = false);
  }


  /* ----- Other public methods --------------------------------------------------------------------------------------------------------- */

  public checkErrors(name: SignInFormEnum, error: ErrorEnum): boolean {
    return this.form.controls[name].errors?.[error] && this.form.controls[name].dirty;
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private initForm(): void {
    this.form = new FormGroup<SignInFormInterface>({
      email: new FormControl({ value: null, disabled: false }, [Validators.required]),
      password: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

}
