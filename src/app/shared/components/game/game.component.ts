/* Angular */
import { Component, Input } from '@angular/core';

/* Animations */
import { fadeInOut, fadeSlideHeightInOut, fadeSlideInOut } from '../../animations/animations.config';

/* Interfaces */
import { GameInterface } from '../../interfaces/game.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [fadeSlideInOut, fadeSlideHeightInOut, fadeInOut]
})
export class GameComponent {

  @Input() game!: GameInterface;

}
