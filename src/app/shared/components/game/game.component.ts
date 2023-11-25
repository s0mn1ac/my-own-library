/* Angular */
import { Component, Input } from '@angular/core';

/* Animations */
import { fadeInOut, fadeSlideHeightInOut, fadeSlideInOut } from '../../animations/animations.config';

/* Services */
import { LibrariesService } from '../../services/libraries.service';

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
  @Input() showInfo: boolean = false;

  private _isLoading: boolean = false;

  constructor(
    private readonly librariesService: LibrariesService
  ) { }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public async onClickAddGameToLibrary(): Promise<void> {
    this.isLoading = true;
    // await this.librariesService.addGameToLibrary();
    this.isLoading = false;
  }

}
