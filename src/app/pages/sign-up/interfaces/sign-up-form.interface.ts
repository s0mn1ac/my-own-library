/* Angular */
import { AbstractControl } from '@angular/forms';

export interface SignUpFormInterface {
  email: AbstractControl;
  name: AbstractControl;
  password: AbstractControl;
}
