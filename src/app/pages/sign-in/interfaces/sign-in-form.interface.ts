/* Angular */
import { AbstractControl } from '@angular/forms';

export interface SignInFormInterface {
  email: AbstractControl;
  password: AbstractControl;
}
