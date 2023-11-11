/* Angular */
import { Component, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class MyButtonComponent {

  @Input() myButtonColor: 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger' = 'primary';

  @Input()
  get myIconButton(): boolean { return this._myIconButton; }
  set myIconButton(myIconButton: BooleanInput) { this._myIconButton = coerceBooleanProperty(myIconButton); }

  @Input()
  get myFlatButton(): boolean { return this._myFlatButton; }
  set myFlatButton(myFlatButton: BooleanInput) { this._myFlatButton = coerceBooleanProperty(myFlatButton); }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(disabled: BooleanInput) { this._disabled = coerceBooleanProperty(disabled); }

  private _myIconButton: boolean = false;
  private _myFlatButton: boolean = false;
  private _disabled: boolean = false;

}
