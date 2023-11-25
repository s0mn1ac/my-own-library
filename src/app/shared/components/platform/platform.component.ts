/* Angular */
import { Component, Input } from '@angular/core';

/* Animations */
import { fadeInOut, fadeSlideHeightInOut, fadeSlideInOut } from '../../animations/animations.config';

/* Enums */
import { PlatformEnum } from '../../enums/platform.enum';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
  animations: [fadeSlideInOut, fadeSlideHeightInOut, fadeInOut]
})
export class PlatformComponent {

  @Input() platform!: PlatformEnum;

  protected readonly PlatformEnum = PlatformEnum;
}
