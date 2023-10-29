/* Angular */
import { Component, Input } from '@angular/core';

/* Enums */
import { LoaderTypeEnum } from '../../enums/loader-type.enum';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  @Input() type!: LoaderTypeEnum;

  protected readonly LoaderTypeEnum: typeof LoaderTypeEnum = LoaderTypeEnum;

}
