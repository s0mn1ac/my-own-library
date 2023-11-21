/* Angular */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/* Firebase */
import { UserCredential } from '@firebase/auth';

/* Services */
import { AuthService } from '../../shared/services/auth.service';
import { ConfigurationsService } from '../../shared/services/configurations.service';

/* Interfaces */
import { SignUpInterface } from './interfaces/sign-up.interface';
import { SignUpFormInterface } from './interfaces/sign-up-form.interface';
import { FirestoreConfigurationInterface } from '../../shared/interfaces/firestore-configuration.interface';

/* Enums */
import { SignUpFormEnum } from './enums/sign-up-form.enum';
import { ErrorEnum } from '../../shared/enums/error.enum';
import { LanguageEnum } from '../../shared/enums/language.enum';
import { ThemeEnum } from '../../shared/enums/theme.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  protected readonly SignUpFormEnum: typeof SignUpFormEnum = SignUpFormEnum;
  protected readonly ErrorEnum: typeof ErrorEnum = ErrorEnum;

  private _form!: UntypedFormGroup;

  private _isLoading: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly configurationsService: ConfigurationsService,
    private readonly router: Router
  ) { }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initForm();
  }


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


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickSignUpWithEmailAndPassword(): void {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    const signUp: SignUpInterface = this.form.value;
    this.authService.createUserWithEmailAndPassword(signUp.email, signUp.password)
      .then( async (userCredential: UserCredential): Promise<void> => {
        await this.createConfiguration(userCredential.user.uid);
        this.router.navigate(['/home']).then();
        this.isLoading = false;
      })
      .catch((error: Error): void => {
        console.error(error);
        this.isLoading = false;
      });
  }


  /* ----- Other public methods --------------------------------------------------------------------------------------------------------- */

  public checkErrors(name: SignUpFormEnum, error: ErrorEnum): boolean {
    return this.form.controls[name].errors?.[error] && this.form.controls[name].dirty;
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private initForm(): void {
    this.form = new FormGroup<SignUpFormInterface>({
      email: new FormControl({ value: null, disabled: false }, [Validators.required]),
      name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      password: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

  private async createConfiguration(uid: string): Promise<void> {
    const configuration: FirestoreConfigurationInterface = { owner: uid, language: LanguageEnum.Es, theme: ThemeEnum.Light };
    await this.configurationsService.createConfiguration(uid, configuration);
  }

}
